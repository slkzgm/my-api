const fs = require ('fs');
const path = require('path');

const dataDirectory = path.join(process.cwd(), 'data');
const filename = '/slkappz.json';
const data = JSON.parse(fs.readFileSync(dataDirectory + filename));

const getMetaTags = (page) => {
  if (page) {
    switch (page) {
      case 'mnlth':
        return data.mnlth;
      case 'mintvial':
        return data.mintvial;
      default:
        return
    }
  }
  return data.default;
}

module.exports = {
  getMetaTags
}
