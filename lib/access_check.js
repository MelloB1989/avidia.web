import axios from 'axios';

const access_check = async (jwt_token) => {
  try {
    // Verify the JWT token
    const response = await axios.post('/api/access_check_user', { "token": jwt_token }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200 && response.data.success) {
      // Session is valid
      return 1;
    } else {
      // Invalid session, redirect to login and clear the token
      return null;
    }
  } catch (error) {
    // Handle token verification errors
    return error;
  }
};

module.exports = access_check;