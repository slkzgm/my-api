require('dotenv').config()
const SseChannel = require('sse-channel');
const { getData } = require("./dunkForge");
const Web3 = require('web3');

const contractABI = [
    {"inputs":[{"internalType":"address","name":"dunkContract","type":"address"},{"internalType":"address","name":"vialContract","type":"address"},{"internalType":"address","name":"cloneXContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ForgeNotActive","type":"error"},{"inputs":[],"name":"InvalidAmount","type":"error"},{"inputs":[],"name":"InvalidMsgValue","type":"error"},{"inputs":[],"name":"InvalidOwner","type":"error"},{"inputs":[],"name":"Unauthorized","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"dunkId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"metadataId","type":"uint256"}],"name":"DunkMetadataSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"dunkId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"metadataId","type":"uint256"}],"name":"DunkMetadataUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"dunkTokenIds","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"cloneTokenIds","type":"uint256[]"},{"components":[{"internalType":"uint32","name":"ghostAmounts","type":"uint32"}],"indexed":false,"internalType":"struct GhostDunkForging.PairAmounts","name":"pairsForged","type":"tuple"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"NewDunkForge","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"GENESIS_DUNKS_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorizedAdmins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cloneXClaims","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"dunkClaims","outputs":[{"internalType":"uint32","name":"ghostPairsClaimed","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"forgeActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"dunkIds","type":"uint256[]"},{"internalType":"uint256[]","name":"cloneIds","type":"uint256[]"},{"components":[{"internalType":"uint32","name":"ghostAmounts","type":"uint32"}],"internalType":"struct GhostDunkForging.PairAmounts","name":"pairsRequested","type":"tuple"}],"name":"forgeToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"forgedSupply","outputs":[{"internalType":"uint32","name":"ghostAmounts","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPrices","outputs":[{"components":[{"internalType":"uint256","name":"ghostPrice","type":"uint256"}],"internalType":"struct GhostDunkForging.Prices","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"dunkTokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"cloneTokenIds","type":"uint256[]"}],"name":"getRemainingAllocations","outputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint32","name":"ghostPairsRemaining","type":"uint32"},{"internalType":"enum GhostDunkForging.Collection","name":"collection","type":"uint8"}],"internalType":"struct GhostDunkForging.ClaimsRemaining[]","name":"","type":"tuple[]"},{"components":[{"internalType":"uint32","name":"ghostAmounts","type":"uint32"}],"internalType":"struct GhostDunkForging.PairAmounts","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"ghostPairPerDunk","type":"uint32"},{"internalType":"uint32","name":"ghostPairPerClone","type":"uint32"}],"name":"setAllocations","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"cloneAddress","type":"address"}],"name":"setCloneContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"dunkAddress","type":"address"}],"name":"setDunkContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ghostPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"vialAddress","type":"address"}],"name":"setVialContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"name":"toggleApprovedAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleForgeActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}
];
const contractAddress = '0x7999185F2B188bD86EA4CAF446C911d6A7c23DEa';

const provider = new Web3.providers.WebsocketProvider(process.env.WEB3_WS_PROVIDER);
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(contractABI, contractAddress);

const sseChannel = new SseChannel();
let baseData = false;

const handleEventCreated = async (payload) => {
    if (baseData === false) {
        baseData = await getData();
    }
    const forged = parseInt(payload.returnValues[2][0]);

    baseData.ghost = baseData.ghost + forged;
    baseData.total = baseData.total + forged;
    baseData.volume = baseData.volume + (forged * 0.11);
    sseChannel.send({data: JSON.stringify(baseData)});
}

const connect = async () => {
    contract.events.NewDunkForge({})
        .on('data', (event) => {
            handleEventCreated(event);
        })
        .on('error', (error) => {
            console.error(`Error while listening to NewDunkForge events: `, error);
        })
}

connect();

module.exports = sseChannel;
