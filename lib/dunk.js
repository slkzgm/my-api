const {contract: dunkContract} = require('./contracts/dunkGenesis');
const {getSkinvialDNA} = require("./skinvials");

const getEquippedVial = async (dunkId) => {
    try {
        if (parseInt(dunkId)) {
            return (await dunkContract.methods.getEquippedSkin(dunkId).call());
        }
    } catch (e) {console.log(e);}
}

const getDunkDetails = async (dunkId) => {
    try {
        const equippedVial = await getEquippedVial(dunkId);
        const vialDNA = await getSkinvialDNA(equippedVial);
        // TODO: replace with the good method once release
        const claimDetails = {
            og: 1,
            x: 2,
            v: 2
        }

        return {
            dunkId: dunkId,
            equippedVial,
            vialDNA,
            claimDetails
        }
    } catch (e) {console.log(e);}
}

module.exports = {
    getEquippedVial,
    getDunkDetails
}