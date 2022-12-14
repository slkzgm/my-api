const EthLib = require('../../lib/eth');
const CirlCollection = require('../../lib/cirlDatabase');

const update = async () => {
  try {
    const [lastSavedId, lastMintedCirl] = await Promise.all([
      CirlCollection.getLastSavedId(),
      EthLib.getCirlSupply()
    ]);
    const start = lastSavedId ? lastSavedId.id + 1 : 0;

    console.log(`Minted Cirl: ${lastMintedCirl}`);
    console.log(`Last saved Cirl: ${start}`);

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
        console.log('No new Cirl minted');
    }
  } catch (e) {console.log(e);}
}

(async () => {
 await update();
})();
