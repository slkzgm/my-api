require('dotenv').config()
const axios = require('axios');
axios.defaults.headers.common['x-api-key'] = process.env.RESERVOIR_API_KEY;

const collectionContracts = [
  {name: 'mintvials', address: '0x348FC118bcC65a92dC033A951aF153d14D945312'},
  {name: 'clones', address: '0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B'},
  {name: 'animus eggs', address: '0x6c410cF0B8c113Dc6A7641b431390B11d5515082'},
  {name: 'mnlth', address: '0x86825dFCa7A6224cfBd2DA48e85DF2fc3Aa7C4B1'},
  {name: 'monoliths', address: '0x6d4bbC0387dD4759EEe30f6A482AC6dC2Df3Facf'},
  {name: 'mnlthx', address: '0x56A67D475DeD20f1120d6377988Ae12992888aC4'},
  {name: 'space pods', address: '0x226Bf5293692610692E2C996C9875C914d2A7f73'},
  {name: 'loot pods', address: '0xb7bE4001BfF2c5F4a61dd2435E4c9A19D8d12343'},
  {name: 'cirl', address: '0x11708DC8A3eA69020f520C81250aBb191b190110'},
  {name: 'cryptokicks', address: '0xF661D58cfE893993b11D53d11148c4650590C692'},
  {name: 'skinvials', address: '0x4fB48c4DA0a633aA9DE199Ad43Bf70e316310541'},
  {name: 'gagosian', address: '0x43764F5B8973F62A6f10914516131c1489E3190D'},
  {name: 'rimowa', address: '0x253ef258563E146f685e60219DA56a6b75178E19'},
  {name: 'forging SZN forged', address: '0x52a043Ec29fbB9A1B142b8913A76c0bC592D0849'},
  {name: 'forging SZN pre-forge', address: '0xa49a0e5eF83cF89Ac8aae182f22E6464B229eFC8'}
];

const retrieveAvgPrice = (dailyStats) => {
  let sales = 0;
  let volume = 0;
  let weeklyAvgPrice, monthlyAvgPrice;

  for (let i = 0; i < 30; i++) {
    if (dailyStats[i]) {
      volume += dailyStats[i].volume;
      sales += dailyStats[i].sales_count;
    }
    if (i === 7)
      weeklyAvgPrice = volume / sales;
    if (i === 29)
      monthlyAvgPrice = volume / sales;
  }
  return {weeklyAvgPrice, monthlyAvgPrice};
};

const collectStats = async (contractAddress) => {
  try {
    const [collectionRequest, dailyStatsRequest] = await Promise.all([
      axios.get(`https://api.reservoir.tools/collections/v5?id=${contractAddress}&includeTopBid=false&includeOwnerCount=true&normalizeRoyalties=false&sortBy=allTimeVolume&limit=20`),
      axios.get(`https://api.reservoir.tools/collections/daily-volumes/v1?id=${contractAddress}&limit=30`)
    ])
    const {floorAsk, floorSaleChange, image, name, ownerCount, tokenCount, volume}
      = collectionRequest.data.collections[0];
    const dailyStats = dailyStatsRequest.data.collections;
    const {weeklyAvgPrice, monthlyAvgPrice} = retrieveAvgPrice(dailyStats);

    return {
      name,
      image,
      floorPrice: floorAsk.price.amount.decimal,
      '7dAveragePrice': weeklyAvgPrice,
      '7dVolume': volume['7day'],
      '24hFloorPriceChange': floorSaleChange['1day'],
      '7dFloorPriceChange': floorSaleChange['7day'],
      '30dAveragePrice': monthlyAvgPrice,
      '30dVolume': volume['30day'],
      owners: ownerCount,
      ownersPercent: (ownerCount / tokenCount) * 100,
      volume: volume['allTime']
    };
  } catch (e) {
    console.log(e);
  }
}

const getData = async () =>
  await Promise.all(collectionContracts.map(contract => collectStats(contract.address)));

module.exports = {
  getData
}
