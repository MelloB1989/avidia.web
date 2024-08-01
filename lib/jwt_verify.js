const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_KEY; // Replace with your secret key for JWT verification

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    //console.log(decoded);
    return decoded;
  } catch (err) {
    console.log("Invalid JWT");
    return null;
  }
};

module.exports = verifyToken;
