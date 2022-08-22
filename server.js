const cors = require('cors');
const express = require('express');
const path = require('path');
const mintVialLib = require("./lib/mintVial");
const mnlthLib = require("./lib/mnlth");
const slkappzLib = require("./lib/slkappz");
const {isNumber} = require("util");
const sandboxLib = require("./lib/sandbox");

const app = express();
app.use(cors());
app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.send("GM WORLDDD!");
});

app.get('/mintVial', (req, res) => {
  res.status(201).json(mintVialLib.getData());
});

app.get('/mintVial/diff', (req, res) => {
  res.status(200).json(mintVialLib.getDiff());
});

app.get('/mintVial/floor', (req, res) => {
  res.status(200).json(mintVialLib.getFloor());
});

app.get('/mintVial/left', (req, res) => {
  res.status(200).json(mintVialLib.getLeft());
});

app.get('/mintVial/opening', (req, res) => {
  res.status(200).json(mintVialLib.getOpening());
});

app.get('/mintVial/revealed', (req, res) => {
  res.status(200).json(mintVialLib.getRevealed());
});

app.get('/mintVial/target', (req, res) => {
  res.status(200).json(mintVialLib.getTarget());
});

app.get('/mnlth', (req, res) => {
  res.status(201).json(mnlthLib.getData());
});

app.get('/mnlth/diff', (req, res) => {
  res.status(200).json(mnlthLib.getDiff());
});

app.get('/mnlth/dunk', (req, res) => {
  res.status(200).json(mnlthLib.getDunk());
});

app.get('/mnlth/floor', (req, res) => {
  res.status(200).json(mnlthLib.getFloor());
});

app.get('/mnlth/left', (req, res) => {
  res.status(200).json(mnlthLib.getLeft());
});

app.get('/mnlth/opening', (req, res) => {
  res.status(200).json(mnlthLib.getOpening());
});

app.get('/mnlth/revealed', (req, res) => {
  res.status(200).json(mnlthLib.getRevealed());
});

app.get('/mnlth/skinvials', (req, res) => {
  res.status(200).json(mnlthLib.getSkinVials());
});

app.get('/mnlth/target', (req, res) => {
  res.status(200).json(mnlthLib.getTarget());
});

app.get('/slkappz', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags()));

app.get('/slkappz/mnlth', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags('mnlth')));

app.get('/slkappz/mintvial', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags('mintvial')));

app.get('/sandbox/:id', async (req, res) => {
  return res.status(200).json(await sandboxLib.getSandboxAsset(parseInt(req.params.id)));
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
