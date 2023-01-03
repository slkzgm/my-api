require('dotenv').config()
const PolygonLib = require("../../lib/polygon");
const fs = require("fs");
const path = require("path");

const dotSwooshContractABI = [
  {"inputs":[{"internalType":"uint256","name":"bps","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"InitialRegistryAddressCannotBeZeroAddress","type":"error"},{"inputs":[],"name":"OnlyOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"OperatorNotAllowed","type":"error"},{"inputs":[],"name":"RegistryHasBeenRevoked","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"availableToWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChainID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"getFeeBps","outputs":[{"internalType":"uint256[]","name":"bps","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"getFeeRecipients","outputs":[{"internalType":"address payable[]","name":"recipients","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"getRoyalties","outputs":[{"internalType":"address payable[]","name":"recipients","type":"address[]"},{"internalType":"uint256[]","name":"bps","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOperatorFilterRegistryRevoked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"_tokenURI","type":"string"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operatorFilterRegistry","outputs":[{"internalType":"contract IOperatorFilterRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"redeemer","type":"address"},{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"minPrice","type":"uint256"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct genR5.NFTVoucher","name":"voucher","type":"tuple"}],"name":"redeem","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"redeemer","type":"address"},{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"minPrice","type":"uint256"},{"internalType":"string","name":"uri","type":"string"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct genR5.NFTVoucher","name":"voucher","type":"tuple"}],"name":"redeemWithGelato","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revokeOperatorFilterRegistry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"royaltyInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_URI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_URI","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"active","type":"bool"}],"name":"setGelatoActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"max","type":"uint256"}],"name":"setMaxByOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMinimumFundToKeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"uint256","name":"bps","type":"uint256"}],"name":"setupRoyalties","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newRegistry","type":"address"}],"name":"updateOperatorFilterRegistryAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}
];
const dotSwooshContractAddress = '0xF4e9CeC411Ad8F99eaf02D5952D24c791C78E6d7';
const lastCheckedBlockPath = path.join(__dirname, 'updateDotSwooshBlock.json');
const {lastCheckedBlock} = require(lastCheckedBlockPath);
const dotSwooshCollection = require("../../lib/dotSwooshDatabase");

const prepareLogo = (data) => {
  const splitted = formatTopicData(data);
  let logoUrl = '';

  splitted.slice(2).forEach(hex => logoUrl = logoUrl.concat(hex));
  return logoUrl;
}

const formatLogo = (logo) => {
  switch (logo) {
    case 'nvs-onboarding-logo-nike-1978-white.svg':
      return 'Nike Swoosh 1976';
    case 'nvs-onboarding-logo-nike-swoosh-white.svg':
      return 'Nike Swoosh';
    case 'nvs-onboarding-logo-nike-.swoosh-white.svg':
      return '.SWOOSH';
    case 'nvs-onboarding-logo-1971-pill-white.svg':
      return 'Nike Script';
    case 'nvs-onboarding-logo-arch-white.svg':
      return 'Big Nike';
    case 'nvs-onboarding-logo-nike-sb-white.svg':
      return 'NIKE';
    case 'nvs-onboarding-logo-nike-snkrs-white.svg':
      return 'SNKRS';
    case 'nvs-onboarding-logo-nike-block-white.svg':
      return 'Nike Baby Teeth';
    case 'nvs-onboarding-logo-nike-basketball-white.svg':
      return 'Nike Basketball';
    case 'nvs-onboarding-logo-slant-white.svg':
      return 'Nike 1976';
    case 'nvs-onboarding-logo-nike-futbol-white.svg':
      return 'Nike Football';
    case 'nvs-onboarding-logo-nike-acg-1-white.svg':
      return 'ACG';
    case 'nvs-onboarding-logo-brs-white.svg':
      return 'Blue Ribbon Sports';
  }
}

const splitString = (str, n) => {
  let result = [];

  for (let i = 0; i < str.length; i += n) {
    result.push(str.substring(i, i + n));
  }
  return result;
}

const formatTopicData = (hex) => splitString(hex.substring(2), 64);

const retrieveDotSwooshUpdate = async (eventType, fromBlock) => {
  const events = await PolygonLib.getPastEvents(dotSwooshContractAddress, dotSwooshContractABI, 'Transfer', {fromBlock: fromBlock + 1});
  const web3 = PolygonLib.connect();

  if (events.length) {
    const tasks = await Promise.all(events.map(async tx => {
      if (tx.returnValues.from === '0x0000000000000000000000000000000000000000') {
        try {
          const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
          const data = {id: null, handle: null, joinDate: null, logoUrl: null, color: null};

          receipt.logs.forEach(log => {
            switch (log.topics[0]) {
              // topic containing token id
              case '0xb64f9b16f9b6eff0c180ee804f0ddea344d3e403ee0b8d2319356817cafd240b':
                data.id = web3.utils.hexToNumber(log.data);
                break;
              // topic containing join date
              case '0xfaa3fc95cb13410980002531681754d41a52724c461fe884ba87f61f4f319dae':
                data.joinDate = web3.utils.hexToNumber(log.data);
                break;
              // topic containing metadata
              case '0x03fed5b2bba74ec653f3397db3f59a565cf36639076e0a98b29d192e26893689':
                data.logoUrl = web3.utils.hexToString('0x' + prepareLogo(log.data));
                break;
              // topic containing color
              case '0xc2d04b85e571bddb1949020291d34e1dc09e8c6389e572059a0e15ba99485061':
                data.color = web3.utils.hexToString('0x' + formatTopicData(log.data)[2]);
                break;
              case '0x339f889fe80b5b8ddfee708e7287e0c26b3eb884a94620a0e19dffd88e3d8d39':
                data.handle = web3.utils.hexToString('0x' + formatTopicData(log.data)[2]);
                break;
            }
          });
          const uriParams = `color=${data.color}&joinTimestamp=${data.joinDate}&logo=${data.logoUrl}&memberNumber=${data.id}&swooshHandle=${data.handle}`;

          return {
            _id: data.id,
            id: data.id,
            handle: data.handle,
            color: data.color,
            logo: formatLogo(data.logoUrl.split('/')[4]),
            joinDate: data.joinDate,
            image: `https://www.swoosh.nike/collection/137/0x4134fc93fd25c32118e81419ffe66ab41a68a317/${data.id}/image?${uriParams}`,
            animation:`https://www.swoosh.nike/collection/137/0x4134fc93fd25c32118e81419ffe66ab41a68a317/${data.id}/animation?${uriParams}`,
            uri: `https://api.swoosh.nike/contracts/137/0x4134fc93fd25c32118e81419ffe66ab41a68a317/${data.id}/metadata?${uriParams}`
          };
        } catch (e) {console.log(e)}
      }
    }));

    console.log(`last saved: ${lastCheckedBlock}`);
    await dotSwooshCollection.insertOrUpdateDocuments(tasks);
    await fs.writeFileSync(lastCheckedBlockPath, JSON.stringify({lastCheckedBlock: events[events.length - 1].blockNumber}));
    console.log(`last checked block: #${events[events.length - 1].blockNumber}`);
  }
};

(async () => {
  await retrieveDotSwooshUpdate('Transfer', lastCheckedBlock);
})();
