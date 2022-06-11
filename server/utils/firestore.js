const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require("./cert.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore()

// db.collection('user').doc("id").set({name: "nathan"})

module.exports.default = db;