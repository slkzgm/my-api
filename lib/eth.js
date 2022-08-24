const Web3 = require("web3");
const {
  providerUrl,
} = require('./ethConfig.json');
const axios = require("axios");

const getBlockNumber = async () => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));

  try {
    const block = await web3.eth.getBlockNumber();
    console.log(`actual block: #${block}`);
    return block;
  } catch (err) {
    console.log(err);
  } finally {
    web3.currentProvider.disconnect();
    console.log('Web3 client disconnected.');
  }
};

const retrieveERC721Metadata = async (contractAddress, contractAbi, uriMethod, tokenId) => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  try {
    const uri = await contract.methods[uriMethod](tokenId).call();

    return (await axios.get(uri)).data;
  } catch (err) {
    console.log(err);
  } finally {
    web3.currentProvider.disconnect();
    console.log('Web3 client disconnected.');
  }
};

const retrieveCloneId = async (txHash, assetContractAddress) => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));

  try {
    const txReceipt = await web3.eth.getTransactionReceipt(txHash);
    const assetLogs = txReceipt.logs
      .filter(e => e.address === assetContractAddress && e.topics.length === 1);
    const cloneLogData = assetLogs[0].data;
    const cloneId = web3.utils.hexToNumber(cloneLogData.slice(0, 66));

    return cloneId;
  } catch (err) {
    console.log(err);
  } finally {
    web3.currentProvider.disconnect();
    console.log('Web3 client disconnected.');
  }
};

const retrieveSkinvialId = async (txHash, assetContractAddress) => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));

  try {
    const txReceipt = await web3.eth.getTransactionReceipt(txHash);
    const assetContract = assetContractAddress;
    const assetLogs = txReceipt.logs
      .filter(e => e.address === assetContract && e.topics.length > 1);
    const skinvialsLogData = assetLogs[0].data;
    const skinvialId = web3.utils.hexToNumber(skinvialsLogData.slice(0, 66));

    return skinvialId;
  } catch (err) {
    console.log(err);
  } finally {
    web3.currentProvider.disconnect();
    console.log('Web3 client disconnected.');
  }
};

const getPastEvents = async (contractAddress, contractAbi, options) => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  try {
    return await contract.getPastEvents('allEvents', options);
  } catch (err) {
    console.log(err);
  } finally {
    web3.currentProvider.disconnect();
    console.log('Web3 client disconnected.');
  }
};

module.exports = {
  getBlockNumber,
  getPastEvents,
  retrieveCloneId,
  retrieveERC721Metadata,
  retrieveSkinvialId
}
