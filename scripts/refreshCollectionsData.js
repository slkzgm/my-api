require('dotenv').config()
const axios = require("axios");
axios.defaults.headers.common['x-api-key'] = process.env.RESERVOIR_API_KEY;

let options = {
  method: 'POST',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
  data: {
    body: ''
  }
};

const refreshCollectionData = async (contractList) => {
    contractList.map(async (contract) => {
      try {
        options.data = JSON.stringify({collection: contract});
        let res = await axios(`https://api.reservoir.tools/collections/refresh/v1`, options);
        console.log(res.statusText);
      } catch (e) {console.log(e.response.data)}
    });
}

const contractList = [
  '0x348FC118bcC65a92dC033A951aF153d14D945312', // MINTVIALS
  '0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B', // CLONEX
  '0x86825dFCa7A6224cfBd2DA48e85DF2fc3Aa7C4B1', // MNLTH
  '0x6d4bbC0387dD4759EEe30f6A482AC6dC2Df3Facf', // MONOLITH
  '0x9A06Ef3a841316a9e2c1C93B9c21a7342abE484F', // SKINVIALS OLD
  '0xF661D58cfE893993b11D53d11148c4650590C692', // CRRYPTOKICKS
  "0x4fB48c4DA0a633aA9DE199Ad43Bf70e316310541", // SKINVIALS NEW
  "0x226Bf5293692610692E2C996C9875C914d2A7f73", // SPACE PODS
  "0xb7bE4001BfF2c5F4a61dd2435E4c9A19D8d12343", // LOOT PODS
  "0x43764F5B8973F62A6f10914516131c1489E3190D", // GAGOSIAN
  "0x253ef258563E146f685e60219DA56a6b75178E19", // RIMOWA
  "0xa49a0e5eF83cF89Ac8aae182f22E6464B229eFC8", // FORGE SZN
  "0x52a043Ec29fbB9A1B142b8913A76c0bC592D0849", // FORGE SZN FORGED
];

(async () => {
  await refreshCollectionData(contractList);
})();
