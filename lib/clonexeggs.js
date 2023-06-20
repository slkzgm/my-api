const {getUnclaimedClones} = require("./clonexeggsDatabase");

const getAvailablesEggs = async () => {
    try {
        return await getUnclaimedClones();
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getAvailablesEggs
}