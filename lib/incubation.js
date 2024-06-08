const IncubationCollection = require("./incubationDatabase");
const getEggDetails = async (eggId) => {
    try {
        if (parseInt(eggId)) {
            return await IncubationCollection.getIncubationDetails(parseInt(eggId));
        }
    } catch (e) {console.log(e);}
}

module.exports = {
    getEggDetails
}