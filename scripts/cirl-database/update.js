const EthLib = require('../../lib/eth');
const CirlCollection = require('../../lib/cirlDatabase');

const update = async () => {
  try {
    const [lastHubbedId, lastMintedCirl] = await Promise.all([
      CirlCollection.getLastHubbedId(),
      EthLib.getCirlSupply()
    ]);
    const start = lastHubbedId ? lastHubbedId.id + 1 : 0;

    console.log(`Minted Cirl: ${lastMintedCirl}`);
    console.log(`Last Hubbed Cirl: ${start}`);

    const promisesList = [];
    for (let i = start; i <= lastMintedCirl; i++) {
      promisesList.push(
        EthLib.getCirlDetails(i)
      );
    }

    const cirlData = await Promise.all(promisesList);
    const tasks = [];

    if (cirlData) {
      cirlData.forEach(cirl => {
        if (cirl) {
          tasks.push(cirl);
          console.log(cirl.id);
        }
      });
      if (tasks.length)
        await CirlCollection.insertMany(tasks);
      else
        console.log('No new hubbed Cirl');
    }
  } catch (e) {console.log(e);}
}

(async () => {
 await update();
})();
