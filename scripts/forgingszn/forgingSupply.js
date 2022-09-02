const Web3 = require("web3");
const {MongoClient}= require("mongodb");

const dbUser = "slkappz";
const dbPassword = "wmWEc09ag9r4fwaC";
const databaseName = "rtfkt-forging";
const databaseCollectionName = "mint"

/* ---- MONGO DB -----*/
const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.guat93h.mongodb.net/?retryWrites=true&w=majority`;
const nameEquivalent = [
  null,
  'CLONE X Genesis T-Shirt 🧬',
  'CLONE X Genesis Hoodie 🧬',
  'CLONE X Genesis Cap 🧬',
  'CLONE X Genesis Socks 🧬'
]

const insertMany = async (tasks) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const res = await collection.insertMany(tasks);
    console.log(`${res.insertedCount} documents were inserted.`);
  } catch (err) {
    console.log(`Number of documents inserted: ${err.result.result.nInserted}`);
  } finally {
    await client.close();
  }
}

const updateSupply = async (_id, supply) => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    await collection.updateOne({_id}, {$set: {supply}});
    console.log(`DATABASE: ${_id} supply successfully updated to ${supply}.`);
  } catch (e) {
    console.log(e)
  } finally {
    await client.close();
  }
};

const getGeneralSupply = async () => {
  const client = new MongoClient(uri);
  const database = client.db(databaseName);
  const collection = database.collection(databaseCollectionName);

  try {
    const supplyFindResult = await collection.find();

    return await supplyFindResult.toArray();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

/* ---- WEB 3 -----*/
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"newForge","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"address","name":"initialCollection","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"cloneXIds","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"wearablesIds","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"newRedeemBatch","type":"event"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"amount","type":"uint256[]"},{"internalType":"address[]","name":"owners","type":"address[]"}],"name":"airdropTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"burnBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cantForge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"tokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"forgeToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"generalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"initialCollection","type":"address"},{"internalType":"uint256[]","name":"cloneXIds","type":"uint256[]"},{"internalType":"uint256[]","name":"wearableIds","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"redeemBatch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"remainingMints","outputs":[{"components":[{"internalType":"uint256","name":"WearableId","type":"uint256"},{"internalType":"uint256","name":"RemainingMints","type":"uint256"}],"internalType":"struct RedeemableToken.Remaining[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setCloneX","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setCloneXMetadata","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAddress","type":"address"}],"name":"setForgingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newContractAddress","type":"address"}],"name":"setMiddleware","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"newUri","type":"string"}],"name":"setTokenURIs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes1","name":"dna","type":"bytes1"},{"internalType":"uint256[2]","name":"range","type":"uint256[2]"}],"name":"setWearableRange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"toggleForgeable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"tokenURIs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"wearableSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0xa49a0e5eF83cF89Ac8aae182f22E6464B229eFC8';
const providerUrl = "wss://mainnet.infura.io/ws/v3/373ca1b7a588416fb561c2693c84a602";

const retrieveSupply = async (contract, id) => {
  return {
    _id: id,
    supply: await contract.methods.generalSupply(id).call()
  };
}

const updateMintedSupply = async () => {
  const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
  const contract = new web3.eth.Contract(contractAbi, contractAddress);
  const promisesList = [];
  let i = 0;

  while (i < 74) {
    promisesList.push(retrieveSupply(contract, i++));
  }
  const res = await Promise.all(promisesList);

  await Promise.all(res.map(e => updateSupply(e._id, e.supply)));
  web3.currentProvider.disconnect();
};

module.exports = {
  updateMintedSupply,
  getGeneralSupply
};
