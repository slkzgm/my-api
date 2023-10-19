const {contract: dunkForgeContract} = require("../../lib/contracts/dunkForge");
const {setForgedSupply} = require("../../lib/dunkForgeDatabase");

(async () => {
    try {
        const supply = await dunkForgeContract.methods.forgedSupply().call();

        await setForgedSupply({
            og: supply.genesisAmounts,
            x: supply.cloneAmounts,
            v: supply.publicAmounts
        });
    } catch (e) {
        console.error(e);
    }
})();