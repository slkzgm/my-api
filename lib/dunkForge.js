const {getForgedSupply} = require("./dunkForgeDatabase");

const getData = async () => {
    try {
        const forgedSupply = await getForgedSupply();

        forgedSupply.total = forgedSupply.og + forgedSupply.x + forgedSupply.v + forgedSupply.ghost;
        forgedSupply.volume = Math.round(((forgedSupply.og + forgedSupply.x + forgedSupply.v * 0.14) + (forgedSupply.ghost * 0.11)) * 100) / 100;
        return forgedSupply;
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    getData
}