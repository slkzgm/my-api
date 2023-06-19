const {contract: eggsContract} = require('../../lib/contracts/eggs');
const {contract: mintvialsContract, web3} = require('../../lib/contracts/mintvials');
const ClonexeggsCollection = require("../../lib/clonexeggsDatabase");

const retrieveCloneId = async (txHash) => {
    try {
        const txReceipt = await web3.eth.getTransactionReceipt(txHash);
        const assetLogs = txReceipt.logs
            .filter(e => e.address === '0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B' && e.topics.length === 1);
        const cloneLogData = assetLogs[0].data;
        const cloneId = web3.utils.hexToNumber(cloneLogData.slice(0, 66));

        return cloneId;
    } catch (err) {
        console.log(err);
    }
};

const getNewClonesMintSince = async (blockFrom, blockTo) => {
    try {
        const events = await mintvialsContract.getPastEvents('TransferSingle', {
            fromBlock: blockFrom,
            toBlock: blockTo
        });

        const newClones = await Promise.all(events.map(async (event) => {
            if (event.raw.topics[3] === '0x0000000000000000000000000000000000000000000000000000000000000000') {
                try {
                    const cloneId = await retrieveCloneId(event.transactionHash);
                    return {
                        _id: cloneId,
                        cloneId,
                        claimed: false
                    };
                } catch (e) {
                    console.log(e);
                }
            }
            return null;
        }));

        return newClones.filter(event => event !== null);
    } catch (e) {
        console.log(e);
    }
}

const getNewEggsMintSince = async (blockFrom, blockTo) => {
    try {
        const events = await eggsContract.getPastEvents('newEgg', {
            fromBlock: blockFrom,
            toBlock: blockTo
        });
        return events.map(event => event.returnValues.cloneId);
    } catch (e) {
        console.log(e);
    }
}

(async () => {
    try {
        const lastCheckedBlock = await ClonexeggsCollection.getLastCheckedBlock();
        const actualBlock = await web3.eth.getBlockNumber();
        const newClones = await getNewClonesMintSince(lastCheckedBlock + 1, actualBlock);

        console.log(`Last checked block: ${lastCheckedBlock}\nActual block: ${actualBlock}`);
        if (newClones.length) {
            console.log(`New clones minted: ${JSON.stringify(newClones)}`);
            await ClonexeggsCollection.insertMany(newClones);
        } else {
            console.log('No new clones minted.');
        }

        const newClaims = await getNewEggsMintSince(lastCheckedBlock + 1, actualBlock);

        if (newClaims.length) {
            console.log(`new claimed eggs: ${JSON.stringify(newClaims)}`);
            await ClonexeggsCollection.updateClaimed(newClaims);
        } else {
            console.log('No new eggs claimed.');
        }

        await ClonexeggsCollection.setLastCheckedBlock(actualBlock);
    } catch (e) {
        console.log(e);
    }
})();
