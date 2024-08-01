import axios from 'axios';

const verify_session = async (jwt_token) => {
  try {
    // Verify the JWT token
    const response = await axios.post('/api/verify_user', { "token": jwt_token }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200 && response.data.success) {
      // Session is valid
      return 1;
    } else {
      // Invalid session, redirect to login and clear the token
      window.location.href = '/login';
      document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      return null;
    }
  } catch (error) {
    // Handle token verification errors
    // If the token verification fails, the user is not authenticated
    window.location.href = '/login';
    return error;
  }
};

module.exports = verify_session;

/*
import axios from 'axios';
const verify_session = async (jwt_token) => {
        try {
        //Verify the JWT token
    const response = await axios.post('/api/verify_user', {"token" : jwt_token}, {
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type for form data
        },
      });
    if(response.status === 200 && response.data.success) {
        const resp = 1;
        return resp;
    }
    if(response.status === 500 || !response.data.success){ window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    return null;
    }
  })
  .catch(function (error) {
    //console.log(error);
    return error;
  });
    //console.log(userData['userId'])
      } catch (error) {
        // Handle token verification errors
        // If the token verification fails, the user is not authenticated
        window.location.href = '/login';
        //console.log(error)
        return error;
      }
    }
module.exports = verify_session;
*/