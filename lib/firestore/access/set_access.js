const jwt = require('jsonwebtoken');
const admin = require('../../firestore_auth');

const db = admin.firestore();
const JWT_KEY = process.env.ACCESS_JWT_KEY;
const setAccess = async (userId) => {
  console.log(userId);
  const docRef = db.collection('users').doc(userId);

  const doc = await docRef.get();

  if (doc.exists) {
    // Document exists, get all document data and put it in a JWT token
    const data = doc.data();
    const token = jwt.sign(data, JWT_KEY, { algorithm: 'HS256' });
    return token;
  } else {
    // Document does not exist, create a new document for the user
    const data = {
      time_spent: [],
      my_courses: [],
      active_labs: [],
      challenges: []
    };
    await docRef.set(data);
    const token = jwt.sign(data, JWT_KEY, { algorithm: 'HS256' });
    return token;
  }
}
module.exports = setAccess;