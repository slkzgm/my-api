const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

const dataDirectory = path.join(process.cwd(), 'data');

function getMnlthData() {
  return JSON.parse(fs.readFileSync(dataDirectory + '/data.json'));
}

app.get('/', (req, res) => {
  const data = getMnlthData();
  res.send("GM WORLDDD!" + data.mnlth.floorPrice);
});

app.get('/mnlth', (req, res) => {
  res.status(200).json({mnlthData: 'ok'});
});

app.get('/mnlth/floor', (req, res) => {
  res.status(200).json({floor: 'ok'});
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
