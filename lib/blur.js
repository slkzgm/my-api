const {decoder} = require('./contracts/blurAirdrop');

const getInput = (url) => {
  if (!url) {
    return {error: 'URL is missing'};
  }

  const splitted = url.split('/')
  if (!splitted|| !splitted[3]) {
    return {error: 'Invalid URL'}
  }

  const encodedData = splitted[3].substring(6);
  if (!encodedData)  {
    return {error: 'Invalid data'}
  }

  const buffer = Buffer.from(encodedData, "base64");
  if (!buffer.toString()) {
    return {error: 'Invalid base64 string'}
  }

  try {
    const {txn} = JSON.parse(buffer.toString());
    const decoded = decoder.decodeData(txn.data);
    const [account, amount, proof] = decoded.inputs;
    return {
      account: '0x' + account,
      amount: amount.toString(),
      proof: '[' + proof + ']'
    }
  } catch (e) {
    return {error: 'Invalid base64 data'}
  }
}

module.exports = {
  getInput
}
