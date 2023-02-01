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
      case 'mintvials':
        return data.mintvials;
      case 'sandbox':
        return data.sandbox;
      case 'ecosystem':
        return data.ecosystem;
      case 'sizecheck':
        return data.sizecheck;
      case 'oncyber':
        return data.oncyber;
      default:
        return
    }
  }
  return data.default;
}

module.exports = {
  getMetaTags
}
