// const nodemailer = require('nodemailer');
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";


const cors = require("cors");
admin.initializeApp(functions.config().firebase);
const main = express();


api.use(cors({ origin: true }));
main.use(cors({ origin: true }));
main.use('/api/v1', (res,req) => {
    req.send("tout vas bieng");
});
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));



//define google cloud function name ******* API REST **********
export const webApi = functions.https.onRequest(main);