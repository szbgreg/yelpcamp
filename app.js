const express = require('express');
const app = express();
const path = require('path');
const portNumber = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(portNumber, () => {
  console.log(`Serving on port ${portNumber}`);
});
