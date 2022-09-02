const forgingsznDb = require('./forgingsznDatabase');

const getData = async () => await forgingsznDb.getGeneralSupply();

module.exports = {
  getData
}
