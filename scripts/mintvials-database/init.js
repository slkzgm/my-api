const ClonesCollection = require('../../lib/mintvialsDatabase');
const fullCollection = require('./data/fullCollection.json');
const EthLib = require('../../lib/eth');

const init = async (fullCollection) => {
  const supply = {
    HUMAN: 0,
    ROBOT: 0,
    DEMON: 0,
    ANGEL: 0,
    REPTILE: 0,
    UNDEAD: 0,
    MURAKAMI: 0,
    ALIEN: 0
  };
  const tasks = [];
  const actualBlock = await EthLib.getBlockNumber();

  fullCollection.forEach(clone => {
    if (clone && clone.dna !== null)
      supply[clone.dna.toUpperCase()] += 1;
  });
  Object.keys(supply).forEach(dna => {
    tasks.push({
      dna,
      supply: supply[dna],
      floorPrice: 0,
      savedAtBlock: actualBlock
    })
  });
  try {
    await ClonesCollection.insertMany(tasks);
  } catch (e) {console.log(e);}
};

(async () => {
  await init(fullCollection);
})();
