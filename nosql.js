require('dotenv').config();
const admin = require('firebase-admin');

const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require(process.env.GOOGLE_APPlICATION_CREDENTIALS);



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: serviceAccount
});

const db = getFirestore();

module.exports = { db, admin };