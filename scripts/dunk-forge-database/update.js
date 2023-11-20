const {contract: dunkForgeContract} = require("../../lib/contracts/dunkForge");
const {contract: dunkGhostForgeContract} = require("../../lib/contracts/dunkGhostForge");
const {setForgedSupply} = require("../../lib/dunkForgeDatabase");

(async () => {
    try {
        const supply = await dunkForgeContract.methods.forgedSupply().call();
        const ghostSupply = await dunkGhostForgeContract.methods.forgedSupply().call();

        await setForgedSupply({
            og: supply.genesisAmounts,
            x: supply.cloneAmounts,
            v: supply.publicAmounts,
            ghost: ghostSupply
        });
    } catch (e) {
        console.error(e);
    }
})();