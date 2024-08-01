var admin = require("firebase-admin");

var serviceAccount = require("../avidia-2cc80-firebase-adminsdk-ivibb-0f28176557");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
module.exports = admin;