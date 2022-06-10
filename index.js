const express = require('express');
const app = express();

app.get('/mnlth', (req, res) => {
  res.send('Mnlth Datas informations');
});

app.get('/test', (req, res) => {
  res.send('TEST OK');
});

app.listen(8080, () => {
  console.log('Server listening');
})
