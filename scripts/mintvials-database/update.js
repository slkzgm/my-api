const ClonesCollection = require('../../lib/mintvialsDatabase');
const EthLib = require('../../lib/eth');
const {
  boxContractAddress,
  boxContractAbi,
  assetContractAddress,
  assetContractAbi
} = require('./config.json')
const axios = require('axios');

const getCollectionFloorPrice = async (collectionContract) => (await axios.get(
  `https://api.reservoir.tools/collections/v5?contract=${collectionContract}`,
  {
    headers: {
      Accept: '*/*'
    }
  }
)).data.collections[0].floorAsk.price.amount.native;

const getDnaAttributesStats = async (contractAddress) => (await axios.get(
    `https://api.reservoir.tools/collections/${contractAddress}/attributes/explore/v3?limit=5000`,
    {
      headers: {
        Accept: '*/*'
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

const updateSupply = async () => {
  const lastSavedBlock = await ClonesCollection.lastSavedBlock();
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
    .map(openingEvent => EthLib.retrieveCloneId(openingEvent.transactionHash, assetContractAddress)));
  const metadatas = await Promise.all(ids
    .map(id => EthLib.retrieveERC721Metadata(assetContractAddress, assetContractAbi, 'tokenURI', id)));
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
    .map(dna => ClonesCollection.addVial(dna.toUpperCase(), supplyToAdd[dna], newLastSavedBlock)));
  console.log('SUPPLY UPDATED');
};

const updateFloorPrices = async () => {
  const [dbPrices, apiPrices] = await Promise.all([
    ClonesCollection.getFloorPrice(),
    getDnaAttributesFloorPrices(assetContractAddress)
  ]);
  const priceToUpdate = dbPrices.map(db => {
    const apiFloorPrice = apiPrices.filter(api => api.dna.toUpperCase() === db.dna)[0].floorPrice;

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
        ClonesCollection.updateFloorPrice(newPrice.dna, newPrice.floorPrice) : true));

  console.log('FLOOR PRICES UPDATED');
};

const updateRelatedFloorPrices = async () => {
  const [mintvialsDbPrice, mintvialsApiPrice] = await Promise.all([
    ClonesCollection.getCollectionsFloorPrices({name: 'MINTVIALS'}),
    getCollectionFloorPrice('0x348FC118bcC65a92dC033A951aF153d14D945312')
  ]);
  if (!mintvialsApiPrice || mintvialsApiPrice === mintvialsDbPrice[0].floorPrice) {
    console.log('No new updates in related floor prices.');
    return ;
  }
  await ClonesCollection.updateCollectionsFloorPrices('MINTVIALS', mintvialsApiPrice);
  console.log('RELATED FLOOR PRICES UPDATED');
};

(async () => {
  try {
    await Promise.all([
      updateSupply(),
      updateFloorPrices(),
      updateRelatedFloorPrices()
    ]);
  } catch (e) {
    console.log(e);
  }
})();
