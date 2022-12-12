const EthLib = require('./eth');

const sizeCheck = async (tokenId) => {
  return EthLib.getCirlSize(tokenId);
}

module.exports = {
  sizeCheck
}

