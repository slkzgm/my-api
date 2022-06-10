const fs = require ('fs');
const path = require('path');

const dataDirectory = path.join(process.cwd(), 'data');
const data = JSON.parse(fs.readFileSync(dataDirectory + '/data.json'));

const getData = () => {
  return data;
}

const getDiff = () => {
  const {dunkGenesis, skinVial} = data;
  const totalRevealedSupply = skinVial.supply + dunkGenesis.equippedSupply;
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

  Object.keys(skinVial.traits).map((dna) => {
    const revealed = skinVial.traits[dna].supply + dunkGenesis.traits[dna].supply;
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

const getDunk = () => {
  let {dunkGenesis} = data;
  const ret = [];

  Object.keys(dunkGenesis.traits).map((dna) => {
    ret.push({
      dna,
      supply: dunkGenesis.traits[dna].supply,
      distribution: (dunkGenesis.traits[dna].supply / dunkGenesis.equippedSupply) * 100,
      floorPrice: dunkGenesis.traits[dna].floorPrice
    });
  });
  ret.push({dna: 'total', supply: dunkGenesis.equippedSupply});

  return ret;
}

const getFloor = () => [
    {collection: 'mnlth', floorPrice: data.mnlth.floorPrice},
    {collection: 'mnlth2', floorPrice: data.mnlth2.floorPrice},
    {collection: 'dunk', floorPrice: data.dunkGenesis.floorPrice},
    {collection: 'vials', floorPrice: data.skinVial.floorPrice}
]

const getLeft = () => {
  const {dunkGenesis, skinVial} = data;
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
  const totalLeftSupply = finalSupply.total - (skinVial.supply + dunkGenesis.equippedSupply);
  const ret = [];

  Object.keys(skinVial.traits).map((dna) => {
    const revealedSupply = dunkGenesis.traits[dna].supply + skinVial.traits[dna].supply;

    ret.push({
      dna,
      supply: finalSupply[dna] - revealedSupply,
      probability: ((finalSupply[dna] - revealedSupply) / totalLeftSupply) * 100,
      floorPrice: skinVial.traits[dna].floorPrice
    });
  });
  ret.push({dna: 'total', supply: totalLeftSupply});

  return ret;
}

const getOpening = () => {
  const {mnlth, mnlth2, dunkGenesis, skinVial} = data;
  const noVialValue = mnlth2.floorPrice + dunkGenesis.floorPrice;
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
  const totalLeftSupply = finalSupply.total - (skinVial.supply + dunkGenesis.equippedSupply);
  const ret = [];

  Object.keys(skinVial.traits).map((dna) => {
    const revealedSupply = skinVial.traits[dna].supply + dunkGenesis.traits[dna].supply;

    ret.push({
      dna,
      supply: finalSupply[dna] - revealedSupply,
      probability: ((finalSupply[dna] - revealedSupply) / totalLeftSupply) * 100,
      valueDiff: (noVialValue - mnlth.floorPrice) + skinVial.traits[dna].floorPrice
    });
  });
  ret.push({dna: 'total', supply: totalLeftSupply});
  ret.push({
    minValue: noVialValue + skinVial.traits.human.floorPrice,
    maxLoss: mnlth.floorPrice - (noVialValue + skinVial.traits.human.floorPrice),
    maxLossPercent: ((mnlth.floorPrice - (noVialValue + skinVial.traits.human.floorPrice)) / mnlth.floorPrice) * 100
  });

  return ret;
}

const getRevealed = () => {
  const {dunkGenesis, skinVial} = data;
  const totalRevealedSupply = skinVial.supply + dunkGenesis.equippedSupply;
  const ret = [];

  Object.keys(skinVial.traits).map((dna) => {
    const revealed = skinVial.traits[dna].supply + dunkGenesis.traits[dna].supply;

    ret.push({
      dna,
      supply: revealed,
      distribution: (revealed / totalRevealedSupply) * 100,
      floorPrice: skinVial.traits[dna].floorPrice
    })
  });
  ret.push({dna: 'total', supply: totalRevealedSupply});

  return ret;
}

const getSkinVials = () => {
  let {skinVial} = data;
  const ret = [];

  Object.keys(skinVial.traits).map((dna) => {
    ret.push({
      dna,
      supply: skinVial.traits[dna].supply,
      distribution: (skinVial.traits[dna].supply / skinVial.supply) * 100,
      floorPrice: skinVial.traits[dna].floorPrice
    });
  });
  ret.push({dna: 'total', supply: skinVial.supply});

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
  getDunk,
  getFloor,
  getLeft,
  getOpening,
  getRevealed,
  getSkinVials,
  getTarget
}
