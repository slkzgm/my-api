const {getForgedSupply} = require("./dunkForgeDatabase");

const getData = async () => {
    try {
        return (await getForgedSupply());
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    getData
}