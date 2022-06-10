const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("GM WORLDDD!");
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
