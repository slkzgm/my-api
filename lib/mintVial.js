const fs = require ('fs');
const path = require('path');

const dataDirectory = path.join(process.cwd(), 'data');
const filename = '/mintVialData.json';
const data = JSON.parse(fs.readFileSync(dataDirectory + filename));

const getData = () => {
  return data;
}

const getDiff = () => {
  const { cloneX } = data;
  const totalRevealedSupply = cloneX.supply;
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

  Object.keys(cloneX.traits).map((dna) => {
    const revealed = cloneX.traits[dna].supply;
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

const getFloor = () => [
  {collection: 'cloneX', floorPrice: data.cloneX.floorPrice},
  {collection: 'mintVial', floorPrice: data.mintVial.floorPrice},
]

const getLeft = () => {
  const { cloneX } = data;
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
  const totalLeftSupply = finalSupply.total - cloneX.supply;
  const ret = [];

  Object.keys(cloneX.traits).map((dna) => {
    const revealedSupply = cloneX.traits[dna].supply;

    ret.push({
      dna,
      supply: finalSupply[dna] - revealedSupply,
      probability: ((finalSupply[dna] - revealedSupply) / totalLeftSupply) * 100,
      floorPrice: cloneX.traits[dna].floorPrice
    });
  });
  ret.push({dna: 'total', supply: totalLeftSupply});

  return ret;
}

const getOpening = () => {
  const { cloneX, mintVial } = data;
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
  const totalLeftSupply = finalSupply.total - cloneX.supply;
  const ret = [];

  Object.keys(cloneX.traits).map((dna) => {
    const revealedSupply = cloneX.traits[dna].supply;

    ret.push({
      dna,
      supply: finalSupply[dna] - revealedSupply,
      probability: ((finalSupply[dna] - revealedSupply) / totalLeftSupply) * 100,
      valueDiff: cloneX.traits[dna].floorPrice - mintVial.floorPrice
    });
  });
  ret.push({dna: 'total', supply: totalLeftSupply});
  ret.push({
    minValue: cloneX.floorPrice,
    maxLoss: cloneX.floorPrice - mintVial.floorPrice,
    maxLossPercent: ((mintVial.floorPrice - cloneX.floorPrice) / mintVial.floorPrice) * 100
  });

  return ret;
}

const getRevealed = () => {
  const { cloneX } = data;
  const totalRevealedSupply = cloneX.supply;
  const ret = [];

  Object.keys(cloneX.traits).map((dna) => {
    const revealed = cloneX.traits[dna].supply;

    ret.push({
      dna,
      supply: revealed,
      distribution: (revealed / totalRevealedSupply) * 100,
      floorPrice: cloneX.traits[dna].floorPrice
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
