const axios = require("axios");

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
  "0x4fB48c4DA0a633aA9DE199Ad43Bf70e316310541" // SKINVIALS NEW
];

(async () => {
  await refreshCollectionData(contractList);
})();
