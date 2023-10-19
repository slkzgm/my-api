const {contract: dunkContract} = require('./contracts/dunkGenesis');
const {contract: dunkForgeContract} = require('./contracts/dunkForge');
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
        const {genesisPairsClaimed, clonePairsClaimed, publicPairsClaimed} = await dunkForgeContract.methods.dunkClaims(dunkId).call();

        const claimDetails = {
            og: 1 - parseInt(genesisPairsClaimed),
            x: 2 - parseInt(clonePairsClaimed),
            v: 2 - parseInt(publicPairsClaimed)
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