const express = require('express');

const authRoute = require('./routes/auth');
const api = express();


api.use('/auth', authRoute);


module.exports = api