require('dotenv').config()
const Web3 = require("web3");
const axios = require("axios");

const providerUrl = process.env.WEB3_WS_PROVIDER;

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
  }
};

const getCirlSize = async (tokenId) => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
  const methodSign = '0x7cf5de4f';
  const encoded = web3.eth.abi.encodeParameter('uint256', tokenId).slice(2);
  const data = methodSign + encoded;

  try {
    const res = await web3.eth.call({
      to: '0x11708DC8A3eA69020f520C81250aBb191b190110',
      data: data,
    });
    return web3.eth.abi.decodeParameter('string', res);
  } catch (e) {console.log(e);} finally {
    web3.currentProvider.disconnect();
  }
};

const getCirlURI = async (tokenId) => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
  const methodSign = '0xc87b56dd';
  const encoded = web3.eth.abi.encodeParameter('uint256', tokenId).slice(2);
  const data = methodSign + encoded;

  try {
    const res = await web3.eth.call({
      to: '0x11708DC8A3eA69020f520C81250aBb191b190110',
      data: data,
    });
    return web3.eth.abi.decodeParameter('string', res);
  } catch (e) {console.log(e);} finally {
    web3.currentProvider.disconnect();
  }
}

const getCirlDetails = async (tokenId) => {
  const cw = [
    'NULL',
    'BLACKOUT',
    'ICE',
    'STONE',
    'SPACE MATTER'
  ];
  try {
    const [URI, size] = await Promise.all([
      getCirlURI(tokenId),
      getCirlSize(tokenId)
    ]);
    const uri = URI.split('/');
    const sizing = size.split('/');
    const hubbed = uri[2] === 'QmYpnsrTXcriPWXrzubb3XJgHDoZhkGj1obdbp4BvGkmZ7';

    return {
      id: tokenId,
      cw: cw[uri[3]],
      size,
      sexe: sizing[0].trim(),
      us: parseFloat(sizing[1].trim().slice(3)),
      uk: parseFloat(sizing[2].trim().slice(3)),
      eu: parseFloat(sizing[3].trim().slice(3)),
      hubbed
    };
  } catch (e) {console.log(e)}
};

const getCirlSupply = async () => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
  const methodSign = '0x18160ddd';

  try {
    const res = await web3.eth.call({
      to: '0x11708DC8A3eA69020f520C81250aBb191b190110',
      data: methodSign,
    });
    return web3.eth.abi.decodeParameter('uint256', res);
  } catch (e) {console.log(e);} finally {
    web3.currentProvider.disconnect();
  }
};

module.exports = {
  getBlockNumber,
  getPastEvents,
  retrieveCloneId,
  retrieveERC721Metadata,
  retrieveSkinvialId,
  getCirlSize,
  getCirlURI,
  getCirlDetails,
  getCirlSupply
}
