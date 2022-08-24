const mnlthDb = require('./mnlthDatabase');

const getData = async () => {
  let [attributes, box] = await Promise.all([
    mnlthDb.getDocuments(),
    mnlthDb.getBoxFloorPrice()
  ]);
  let cryptokicks, mnlth, monolith;
  box.filter(e => {
    if (e.name === 'CRYPTOKICKS')
      cryptokicks = {floorPrice: e.floorPrice};
    if (e.name === 'MNLTH')
      mnlth = {floorPrice: e.floorPrice};
    if (e.name === 'MONOLITH')
      monolith = {floorPrice: e.floorPrice};
  })
  const traits = {};
  let supply = 0;
  let floorPrice = 0;

  attributes.sort((a, b) => a.supply > b.supply ? -1 : 1);
  attributes.forEach(trait => {
    traits[trait.dna.toLowerCase()] = {
      supply: trait.supply,
      floorPrice: trait.floorPrice
    };
    supply += trait.supply;
    if (floorPrice === 0 || trait.floorPrice < floorPrice && trait.floorPrice > 0)
      floorPrice = trait.floorPrice;
  });

  return {
    mnlth,
    monolith,
    skinvials: {
      supply,
      floorPrice,
      traits
    },
    cryptokicks
  };
}

const getDiff = async () => {
  const skinvials = (await getData()).skinvials;
  const totalRevealedSupply = skinvials.supply;
  const supposedSupply = {
    human: .5006 * totalRevealedSupply,
    robot: .2995 * totalRevealedSupply,
    demon: .0875 * totalRevealedSupply,
    angel: .0875 * totalRevealedSupply,
    reptile: .0125 * totalRevealedSupply,
    undead: .006 * totalRevealedSupply,
    murakami: .0049 * totalRevealedSupply,
    alien: .0015 * totalRevealedSupply
  };
  const ret = [];

  Object.keys(skinvials.traits).map((dna) => {
    const revealed = skinvials.traits[dna].supply;
    ret.push({
      dna,
      revealed,
      supposed: supposedSupply[dna],
      supplyDiff: revealed - supposedSupply[dna],
      supplyDiffPercent: 100 * ((revealed / supposedSupply[dna]) - 1)
    });
  });
  ret.push({dna: 'total', revealed: totalRevealedSupply});

  return ret;
}

const getFloor = async () => {
  const data = await getData();

  return [
    {collection: 'mnlth', floorPrice: data.mnlth.floorPrice},
    {collection: 'monolith', floorPrice: data.monolith.floorPrice},
    {collection: 'cryptokicks', floorPrice: data.cryptokicks.floorPrice},
    {collection: 'skinvials', floorPrice: data.skinvials.floorPrice}
  ];
}

const getLeft = async () => {
  const skinvials = (await getData()).skinvials;
  const finalSupply = {
    human: 10012,
    robot: 5990,
    demon: 1750,
    angel: 1750,
    reptile: 250,
    undead: 120,
    murakami: 98,
    alien: 30,
    total: 20000
  };
  const totalLeftSupply = finalSupply.total - skinvials.supply;
  const ret = [];

  Object.keys(skinvials.traits).map((dna) => {
    const revealedSupply = skinvials.traits[dna].supply;

    ret.push({
      dna,
      supply: finalSupply[dna] - revealedSupply,
      probability: ((finalSupply[dna] - revealedSupply) / totalLeftSupply) * 100,
      floorPrice: skinvials.traits[dna].floorPrice
    });
  });
  ret.push({dna: 'total', supply: totalLeftSupply});

  return ret;
}

const getOpening = async () => {
  const {mnlth, monolith, cryptokicks, skinvials} = await getData();
  const noVialValue = monolith.floorPrice + cryptokicks.floorPrice;
  const finalSupply = {
    human: 10012,
    robot: 5990,
    demon: 1750,
    angel: 1750,
    reptile: 250,
    undead: 120,
    murakami: 98,
    alien: 30,
    total: 20000
  };
  const totalLeftSupply = finalSupply.total - skinvials.supply;
  const ret = [];

  Object.keys(skinvials.traits).map((dna) => {
    const revealedSupply = skinvials.traits[dna].supply;

    ret.push({
      dna,
      supply: finalSupply[dna] - revealedSupply,
      probability: ((finalSupply[dna] - revealedSupply) / totalLeftSupply) * 100,
      valueDiff: (noVialValue - mnlth.floorPrice) + skinvials.traits[dna].floorPrice
    });
  });
  ret.push({dna: 'total', supply: totalLeftSupply});
  ret.push({
    minValue: noVialValue + skinvials.traits.human.floorPrice,
    maxLoss: mnlth.floorPrice - (noVialValue + skinvials.traits.human.floorPrice),
    maxLossPercent: ((mnlth.floorPrice - (noVialValue + skinvials.traits.human.floorPrice)) / mnlth.floorPrice) * 100
  });

  return ret;
}

const getRevealed = async () => {
  const skinvials = (await getData()).skinvials;
  const totalRevealedSupply = skinvials.supply;
  const ret = [];

  Object.keys(skinvials.traits).map((dna) => {
    const revealed = skinvials.traits[dna].supply;

    ret.push({
      dna,
      supply: revealed,
      distribution: (revealed / totalRevealedSupply) * 100,
      floorPrice: skinvials.traits[dna].floorPrice
    })
  });
  ret.push({dna: 'total', supply: totalRevealedSupply});

  return ret;
}

const getTarget = () => [
  {dna: 'human', supply: 10012, distribution: 50.06},
  {dna: 'robot', supply: 5990, distribution: 29.95},
  {dna: 'demon', supply: 1750, distribution: 8.75},
  {dna: 'angel', supply: 1750, distribution: 8.75},
  {dna: 'reptile', supply: 250, distribution: 1.25},
  {dna: 'undead', supply: 120, distribution: .6},
  {dna: 'murakami', supply: 98, distribution: .49},
  {dna: 'alien', supply: 30, distribution: .15},
  {dna: 'total', supply: 20000}
]

module.exports = {
  getData,
  getDiff,
  getFloor,
  getLeft,
  getOpening,
  getRevealed,
  getTarget
}
