const admin = require("firebase-admin");

// Ensure environment variable exists
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY in .env file");
}

// Parse JSON from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
