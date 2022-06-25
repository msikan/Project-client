const express = require('express');

const authRoute = require('./routes/auth');
const levCoinsRoute = require('./routes/levCoins');

const api = express();


api.use('/auth', authRoute);

api.use('/levcoins', levCoinsRoute);


module.exports = api