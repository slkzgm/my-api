const SkinvialsCollection = require('../../lib/mnlthDatabase');
const EthLib = require('../../lib/eth');
const {
  boxContractAddress,
  boxContractAbi,
  assetContractAddress,
  assetContractAddress2,
  assetContractAbi
} = require('./config.json')
const axios = require('axios');

const getCollectionFloorPrice = async (collectionContract) => (await axios.get(
  `https://api.reservoir.tools/collections/v5?contract=${collectionContract}`,
  {
    headers: {
      Accept: '*/*',
      'x-api-key': process.env.RESERVOIR_API_KEY
    }
  }
)).data.collections[0].floorAsk.price.amount.native;

const getDnaAttributesStats = async (collectionContract) => (await axios.get(
    `https://api.reservoir.tools/collections/${collectionContract}/attributes/explore/v3?limit=5000`,
    {
      headers: {
        Accept: '*/*',
        'x-api-key': process.env.RESERVOIR_API_KEY
      }})
).data.attributes.filter(attr => attr.key === 'DNA');

const getDnaAttributesFloorPrices = async (collectionContract) =>
  (await getDnaAttributesStats(collectionContract))
    .map(dna => ({
      dna: dna.value,
      floorPrice: dna.floorAskPrices[0]
    }));

const getLowest = (a, b) => {
  if (!a || !b)
    return !a ? b : a;
  return a < b ? a : b;
}

const getLowestFloorPrices = (a, b) => {
  return a.map(a => {
    return {
      dna: a.dna,
      floorPrice: getLowest(a.floorPrice, b
        .filter(e => e.dna === a.dna)[0].floorPrice)
    };
  });
}

const retrieveFloorPrices = async (address1, address2) => {
  const [oldPrices, newPrices] = (await Promise.all([
    getDnaAttributesFloorPrices(address1),
    getDnaAttributesFloorPrices(address2)
  ]));

  return getLowestFloorPrices(newPrices, oldPrices);
};

const updateSupply = async () => {
  const lastSavedBlock = await SkinvialsCollection.lastSavedBlock();
  const events = await EthLib
    .getPastEvents(boxContractAddress, boxContractAbi, {fromBlock: lastSavedBlock + 1});

  if (!events[0]) {
    console.log(`No events fired since the block #${lastSavedBlock}.`);
    return ;
  }
  const newLastSavedBlock = events[events.length - 1].blockNumber;
  const opening = events.filter(e => e.event === 'TransferSingle'
    && e.raw.topics[3] === '0x0000000000000000000000000000000000000000000000000000000000000000');

  if (!opening[0]) {
    console.log(`No new mint since the block #${newLastSavedBlock}`);
    return ;
  }
  const ids = await Promise.all(opening
    .map(openingEvent => EthLib.retrieveSkinvialId(openingEvent.transactionHash, assetContractAddress)));
  const metadatas = await Promise.all(ids
    .map(id => EthLib.retrieveERC721Metadata(assetContractAddress, assetContractAbi, 'uri', id)));
  const dna = metadatas
    .map(metadata => metadata.attributes
      .filter((attribute) => attribute.trait_type === 'DNA')[0].value);
  const supplyToAdd = {};

  dna.map(dna => {
    if (!supplyToAdd[dna])
      supplyToAdd[dna] = 0;
    supplyToAdd[dna] += 1;
  });
  await Promise.all(Object.keys(supplyToAdd)
    .map(dna => SkinvialsCollection.addVial(dna, supplyToAdd[dna], newLastSavedBlock)));
  console.log('SUPPLY UPDATED');
};

const updateFloorPrices = async () => {
  const [dbPrices, apiPrices] = await Promise.all([
    SkinvialsCollection.getFloorPrice(),
    retrieveFloorPrices(assetContractAddress, assetContractAddress2)
  ]);
  const priceToUpdate = dbPrices.map(db => {
    const apiFloorPrice = apiPrices.filter(api => api.dna === db.dna)[0].floorPrice;

    if (db.floorPrice !== apiFloorPrice && apiFloorPrice !== 0)
      return {
        dna: db.dna,
        floorPrice: apiFloorPrice
      }
  })

  if (!priceToUpdate[0]) {
    console.log('No new updates in floor prices.');
    return ;
  }
  await Promise.all(
    priceToUpdate
      .map(newPrice => newPrice ?
        SkinvialsCollection.updateFloorPrice(newPrice.dna, newPrice.floorPrice) : true)
  );
  console.log('FLOOR PRICES UPDATED');
};

const updateRelatedFloorPrices = async () => {
  const [dbPrices, mnlthApiPrice, monolithApiPrice, cryptokicksApiPrice] = await Promise.all([
    SkinvialsCollection.getCollectionsFloorPrices(),
    getCollectionFloorPrice('0x86825dFCa7A6224cfBd2DA48e85DF2fc3Aa7C4B1'),
    getCollectionFloorPrice('0x6d4bbC0387dD4759EEe30f6A482AC6dC2Df3Facf'),
    getCollectionFloorPrice('0xF661D58cfE893993b11D53d11148c4650590C692')
  ]);
  const priceToUpdate = [];

  dbPrices.filter(e => {
    if (e.name === 'MNLTH' && mnlthApiPrice && mnlthApiPrice !== e.floorPrice)
      priceToUpdate.push({name: "MNLTH", floorPrice: mnlthApiPrice});
    if (e.name === 'MONOLITH' && monolithApiPrice && monolithApiPrice !== e.floorPrice)
      priceToUpdate.push({name: "MONOLITH", floorPrice: monolithApiPrice});
    if (e.name === 'CRYPTOKICKS' && cryptokicksApiPrice && cryptokicksApiPrice !== e.floorPrice)
      priceToUpdate.push({name: "CRYPTOKICKS", floorPrice: cryptokicksApiPrice});
  });
  if (!priceToUpdate[0]) {
    console.log('No new updates in related floor prices.');
    return ;
  }
  await Promise.all([
    priceToUpdate
      .map(newPrice => newPrice ?
        SkinvialsCollection.updateCollectionsFloorPrices(newPrice.name, newPrice.floorPrice) : true)
  ]);
  console.log('RELATED FLOOR PRICES UPDATED');
};

(async () => {
  try {
    await Promise.all([
      updateSupply(),
      updateFloorPrices(),
      updateRelatedFloorPrices(),
    ]);
  } catch (e) {
    console.log(e);
  }
})();
