const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_KEY; // Replace with your secret key for JWT verification
const redirectUrl = 'http://18.60.49.135:8443/?folder=/config/workspace'; // Replace with the URL you want to redirect users to

// Middleware to handle JWT verification and redirection
export default function proxy(req, res, next) {
  const token = req.query.token; // Extract the token from the URL parameter

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    // Redirect user to a different website
    res.redirect(redirectUrl);
  });
};
