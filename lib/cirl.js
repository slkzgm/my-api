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

const getSize = async (size, cw, onlyHubbed = false) => {
  try  {
    if (size && parseFloat(size)) {
      if (!availableCw.includes(cw))
        return await CirlCollection.getUsSize(parseFloat(size), null, onlyHubbed);
      return await CirlCollection.getUsSize(parseFloat(size), cw, onlyHubbed);
    }
    return [];
  } catch (e) {console.log(e);}
}

const getDetails = async (tokenId) => {
  try {
    if (parseInt(tokenId))
      return EthLib.getCirlDetails(tokenId);
  } catch (e) {console.log(e);}
}

module.exports = {
  getDetails,
  getSize,
  sizeCheck
}
