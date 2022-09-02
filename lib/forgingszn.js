const forgingsznDb = require('./forgingsznDatabase');

const getData = async () => {
  const supply  = await forgingsznDb.getGeneralSupply();

  supply.forEach(e => e['%'] = (e.minted / e.maxSupply) * 100);
  return supply;
};

module.exports = {
  getData
}
