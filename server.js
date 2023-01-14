const cors = require('cors');
const express = require('express');
const path = require('path');
const mintvialsLib = require("./lib/mintvials");
const mnlthLib = require("./lib/mnlth");
const slkappzLib = require("./lib/slkappz");
const sandboxLib = require("./lib/sandbox");
const forgingSznLib = require("./lib/forgingszn");
const ecosystemStatsLib = require("./lib/ecosystemStats");
const cirlLib = require("./lib/cirl")
const dotSwooshLib = require("./lib/dotSwoosh");

const app = express();
app.use(cors());
app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.send("GM WORLDDD!");
});

app.get('/mintvials', async (req, res) => {
  res.status(200).json(await mintvialsLib.getData());
});

app.get('/mintvials/diff', async (req, res) => {
  res.status(200).json(await mintvialsLib.getDiff());
});

app.get('/mintvials/floor', async (req, res) => {
  res.status(200).json(await mintvialsLib.getFloor());
});

app.get('/mintvials/left', async (req, res) => {
  res.status(200).json(await mintvialsLib.getLeft());
});

app.get('/mintvials/opening', async (req, res) => {
  res.status(200).json(await mintvialsLib.getOpening());
});

app.get('/mintvials/revealed', async (req, res) => {
  res.status(200).json(await mintvialsLib.getRevealed());
});

app.get('/mintvials/target', (req, res) => {
  res.status(200).json(mintvialsLib.getTarget());
});

app.get('/mnlth', async (req, res) => {
  res.status(200).json(await mnlthLib.getData());
});

app.get('/mnlth/diff', async (req, res) => {
  res.status(200).json(await mnlthLib.getDiff());
});

app.get('/mnlth/floor', async (req, res) => {
  res.status(200).json(await mnlthLib.getFloor());
});

app.get('/mnlth/left', async (req, res) => {
  res.status(200).json(await mnlthLib.getLeft());
});

app.get('/mnlth/opening', async (req, res) => {
  res.status(200).json(await mnlthLib.getOpening());
});

app.get('/mnlth/revealed', async (req, res) => {
  res.status(200).json(await mnlthLib.getRevealed());
});

app.get('/mnlth/target', (req, res) => {
  res.status(200).json(mnlthLib.getTarget());
});

app.get('/slkappz', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags()));

app.get('/slkappz/mnlth', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags('mnlth')));

app.get('/slkappz/mintvials', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags('mintvials')));

app.get('/slkappz/sandbox', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags('sandbox')));

app.get('/slkappz/ecosystem', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags('ecosystem')));

app.get('/slkappz/sizecheck', (req, res) =>
  res.status(200).json(slkappzLib.getMetaTags('sizecheck')));

app.get('/sandbox/:id', async (req, res) => {
  return res.status(200).json(await sandboxLib.getSandboxAsset(parseInt(req.params.id)));
});

app.get('/forgingszn', async (req, res) => {
  return res.status(200).json(await forgingSznLib.getData());
});

app.get('/ecosystemStats', async (req, res) => {
  return res.status(200).json(await ecosystemStatsLib.getData());
});

app.get('/sizecheck/:id', async (req, res) => {
  return res.status(200).json(await cirlLib.sizeCheck(req.params.id));
});

app.get('/cirlfind', async (req, res) => {
  const onlyHubbed = (req.query.onlyHubbed === 'true');
  return res.status(200).json(await cirlLib.getSize(req.query.size, req.query.cw, onlyHubbed));
});

app.get('/cirldetails/:id', async (req, res) => {
  return res.status(200).json(await cirlLib.getDetails(req.params.id));
});

app.get('/dotswoosh/handle/:handle', async (req, res) => {
  return res.status(200).json(await dotSwooshLib.getByHandle(req.params.handle));
});

app.get('/dotswoosh/distribution', async (req, res) => {
  return res.status(200).json(await dotSwooshLib.getDistribution());
});

app.get('/dotswoosh/distribution/colors', async (req, res) => {
  return res.status(200).json((await dotSwooshLib.getColorDistribution()).slice(0, 50));
});

app.get('/dotswoosh/distribution/logos', async (req, res) => {
  return res.status(200).json(await dotSwooshLib.getLogoDistribution());
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
