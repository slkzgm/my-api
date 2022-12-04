const axios = require('axios');
const fs = require('fs');
const path = require('path');
const {
  collectionStart,
  collectionSize,
  collectionMetadataUrl,
} = require('./config.json');

const scrapDatas = () => {
  let i = collectionStart;
  const fullCollection = [];
  const dataDirectory = path.join(process.cwd(), 'data');
  const filename = '/fullCollection.json';
  const filePath = dataDirectory + filename;
  const promisesList = [];

  while (collectionSize >= i) {
    promisesList.push(axios.get(`${collectionMetadataUrl}${i++}`));
  }

  try {
    const scrap = (promisesList) => {
      Promise.allSettled(promisesList)
        .then((responses) => {
          const errorsList = [];

          responses.forEach(r => {
            if (r.status !== 'fulfilled') {
              const id = parseInt(r.reason.config.url.slice(collectionMetadataUrl.length));

              if (r.reason.response && r.reason.response.status === 500) return;
              errorsList.push(id);
            } else {
              if (r.value.data.attributes) {
                const data = r.value.data;
                const id = parseInt(r.value.config.url.slice(collectionMetadataUrl.length));
                const dna = data.attributes.filter((attribute) => attribute.trait_type === 'DNA')[0].value;

                fullCollection[id] = {id, dna}
              }
            }
          });
          console.log('DONE');
          if (errorsList.length) {
            const promises = [];

            console.log(errorsList);
            errorsList.forEach(err => {
              promises.push(axios.get(`${collectionMetadataUrl}${err}`));
            });
            scrap(promises);
          } else {
            fs.writeFile(filePath, JSON.stringify(fullCollection), () => console.log(`${filename} updated.`));
            console.log('updated');
          }
        }).catch(console.dir)
    }
    scrap(promisesList);
  } catch (e) {
    console.log(e);
  }
};

scrapDatas();
