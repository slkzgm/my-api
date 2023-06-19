const {contract: eggContract} = require('../../lib/contracts/eggs');
const clonexeggsDatabase = require("../../lib/clonexeggsDatabase");

(async () => {
    try {
        let clonesClaimedStatus = [];
        const batchSize = 100;

        for (let i = 0; i < 19496; i += batchSize) {
            const promises = [];
            for (let j = i; j < Math.min(i + batchSize, 19496); j++) {
                promises.push(
                    eggContract.methods.claimedClone(j+1).call().then(claimed => {
                        return {
                            _id: j + 1,
                            cloneId: j + 1,
                            claimed
                        };
                    })
                );
            }

            const batchResults = await Promise.all(promises);

            clonesClaimedStatus = [...clonesClaimedStatus, ...batchResults];
            console.log(`Batch ${i/batchSize + 1} completed`);
        }
        await clonexeggsDatabase.insertMany(clonesClaimedStatus);
    } catch (e) {
        console.log(e);
    }
})();