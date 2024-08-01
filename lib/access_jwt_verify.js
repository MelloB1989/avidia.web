const jwt = require('jsonwebtoken');

const secretKey = process.env.ACCESS_JWT_KEY; // Replace with your secret key for JWT verification

// Function to verify a JWT token
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    console.log("Invalid Token");
    return null;
  }
};

module.exports = verifyAccessToken;
