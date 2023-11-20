const {contract: dunkContract} = require('./contracts/dunkGenesis');
const {contract: dunkForgeContract} = require('./contracts/dunkForge');
const {contract: dunkGhostForgeContract} = require('./contracts/dunkGhostForge');
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
        const [{genesisPairsClaimed, clonePairsClaimed, publicPairsClaimed}, ghost] = await Promise.all([
            dunkForgeContract.methods.dunkClaims(dunkId).call(),
            dunkGhostForgeContract.methods.dunkClaims(dunkId).call(),
        ]);

        const claimDetails = {
            og: 1 - parseInt(genesisPairsClaimed),
            x: 2 - parseInt(clonePairsClaimed),
            v: 2 - parseInt(publicPairsClaimed),
            ghost: 2 - parseInt(ghost)
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