const fs = require('fs');
const express = require('express');
const path = require('path');
const {getDunk, getFloor, getLeft, getOpening, getRevealed, getSkinVials, getTarget, getDiff} = require("./lib/mnlth");
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
  const data = getMnlthData();
  res.status(200).json(data);
});

app.get('/mnlth/diff', (req, res) => {
  res.status(200).json(getDiff());
});

app.get('/mnlth/dunk', (req, res) => {
  res.status(200).json(getDunk());
});

app.get('/mnlth/floor', (req, res) => {
  res.status(200).json(getFloor());
});

app.get('/mnlth/left', (req, res) => {
  res.status(200).json(getLeft());
});

app.get('/mnlth/opening', (req, res) => {
  res.status(200).json(getOpening());
});

app.get('/mnlth/revealed', (req, res) => {
  res.status(200).json(getRevealed());
});

app.get('/mnlth/skinvials', (req, res) => {
  res.status(200).json(getSkinVials());
});

app.get('/mnlth/target', (req, res) => {
  res.status(200).json(getTarget());
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
