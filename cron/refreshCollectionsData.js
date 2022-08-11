const axios = require("axios");

let options = {
  method: 'POST',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'x-api-key': '3d2262eb-b4ff-415f-bfe8-88471923a77e'
  },
  data: {
    body: ''
  }
};

const retrieveCollectionStats = async (contractList) => {
    contractList.map(async (contract) => {
      try {
        options.data = JSON.stringify({collection: contract});
        let res = await axios(`https://api.reservoir.tools/collections/refresh/v1`, options);
        console.log(res.statusText);
      } catch (e) {console.log(e.response.data)}
    });
}

const contractList = [
  '0x348fc118bcc65a92dc033a951af153d14d945312',
  '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
  '0x86825dfca7a6224cfbd2da48e85df2fc3aa7c4b1',
  '0x6d4bbc0387dd4759eee30f6a482ac6dc2df3facf',
  '0x9a06ef3a841316a9e2c1c93b9c21a7342abe484f',
  '0xf661d58cfe893993b11d53d11148c4650590c692'
];

(async () => {
  await retrieveCollectionStats(contractList);
})();
