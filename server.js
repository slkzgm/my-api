const express = require('express');
const {getDunk, getFloor, getLeft, getOpening, getRevealed, getSkinVials, getTarget, getDiff,
  getData
} = require("./lib/mnlth");
const app = express();

app.get('/', (req, res) => {
  const data = getMnlthData();
  res.send("GM WORLDDD!" + data.mnlth.floorPrice);
});

app.get('/mnlth', (req, res) => {
  res.status(201).json(getData());
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
