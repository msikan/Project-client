const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const db = require("./utils/firestore");

const app = express();

const api = require("./api");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


api.use(cors({ origin: true }));
app.use(cors({ origin: true }));

app.use('/api', api);

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;
