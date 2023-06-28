const {getUnclaimedClones} = require("./clonexeggsDatabase");
const {contract: eggsContract} = require('./contracts/eggs');

const getAvailablesEggs = async () => {
    try {
        return await getUnclaimedClones();
    } catch (e) {
        console.log(e);
    }
}

const eggToClone = async (eggId) => {
    try {
        return await eggsContract.methods.eggToClone(eggId).call();
    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    getAvailablesEggs,
    eggToClone
}