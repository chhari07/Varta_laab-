const admin = require("firebase-admin");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const serviceAccountPath = path.resolve(__dirname, "firebaseServiceAccountKey.json");

// Check if the file exists
if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Firebase service account key is missing!");
  process.exit(1);
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

module.exports = { admin };
