const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const restaurantsRouter = require('./routes/restaurants');


const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

app.use('/restaurants', restaurantsRouter);

app.use('*', function(req, res) {
  res.status(404).json({ message: 'Knot Found' });
});

module.exports = app;
