const express = require('express');
const coinsRouter = express.Router();

const coinsController = require('../controllers/levCoins');
const requireAuth = require('../middlewares/requireAuth');



// POST
coinsRouter.post('/', requireAuth, coinsController.addLevCoins );

// GET
coinsRouter.get('/',requireAuth,coinsController.getLevCoins);


module.exports = coinsRouter;