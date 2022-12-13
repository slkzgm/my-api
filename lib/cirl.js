const EthLib = require("./eth");
const CirlCollection = require("./cirlDatabase");

const availableCw = ['BLACKOUT', 'ICE', 'STONE', 'SPACE MATTER'];

const sizeCheck = async (tokenId) => {
  try {
    if (parseInt(tokenId))
      return EthLib.getCirlSize(tokenId);
    return '';
  } catch (e) {console.log(e);}
}

const getSize = async (size, cw) => {
  try  {
    if (size && parseFloat(size)) {
      if (!availableCw.includes(cw))
        return await CirlCollection.getUsSize(parseFloat(size));
      return await CirlCollection.getUsSize(parseFloat(size), cw);
    }
    return [];
  } catch (e) {console.log(e);}
}

module.exports = {
  getSize,
  sizeCheck
}
