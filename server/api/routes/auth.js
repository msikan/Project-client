const express = require('express');
const userRouter = express.Router();

const authController = require('../controllers/auth');
const requireAuth = require('../middlewares/requireAuth');



// POST
userRouter.post('/signin', authController.signin );
userRouter.post('/signup', authController.signup);

// GET
userRouter.get('/userInfo',requireAuth,authController.getUserInfo);


module.exports = userRouter;