const {getForgedSupply} = require("./dunkForgeDatabase");

const getData = async () => {
    try {
        const forgedSupply = await getForgedSupply();

        forgedSupply.total = forgedSupply.og + forgedSupply.x + forgedSupply.v;
        forgedSupply.volume = forgedSupply.total * 0.14;
        return forgedSupply;
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    getData
}