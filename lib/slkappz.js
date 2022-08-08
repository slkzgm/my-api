const fs = require ('fs');
const path = require('path');

const dataDirectory = path.join(process.cwd(), 'data');
const filename = '/slkappz.json';
const data = JSON.parse(fs.readFileSync(dataDirectory + filename));

const getData = () => {
  return data;
}

module.exports = {
  getData
}
