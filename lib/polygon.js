require('dotenv').config()
const Web3 = require("web3");

const connect = () => new Web3(new Web3.providers.HttpProvider(process.env.POLYGON_PROVIDER));

const getPastEvents = async (contractAddress, contractABI, eventType, options) => {
  const web3 = await connect();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  try {
    return await contract.getPastEvents(eventType || 'allEvents', options);
  } catch (err) {
    console.log(err);
  } finally {
    web3.currentProvider.disconnect();
  }
}

module.exports = {
  connect,
  getPastEvents
}
