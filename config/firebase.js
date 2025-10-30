const { getDatabase } = require("firebase-admin/database");
const { initializeApp, cert } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const serviceAccount = require('./service-account.json')

const firebaseConfig = {
  credential: cert(serviceAccount),
  apiKey: "AIzaSyCyYBTARXBL9eNZapPZxOIpUQKWfVSVLkg",
  authDomain: "astroone-9f4d9.firebaseapp.com",
  databaseURL: "https://astroone-9f4d9-default-rtdb.firebaseio.com",
  projectId: "astroone-9f4d9",
  storageBucket: "astroone-9f4d9.appspot.com",
  messagingSenderId: "602788366308",
  appId: "1:602788366308:web:1ca6be60f5045c5f5b69f1",
  measurementId: "G-RSM0090ZH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messaging = getMessaging(app);

module.exports = {
  app,
  database,
  messaging
};
