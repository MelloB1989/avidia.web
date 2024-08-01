import axios from 'axios';
//import get_user from './firestore/get_user';
//const jwt = require('jsonwebtoken');
//const secretKey = process.env.JWT_KEY;

const get_user_data = async (jwt_token) => {
  try {
    
    //const decoded_jwt = jwt(jwt_token, secretKey);
    //const fdata = await get_user(decoded_jwt.userId);
    
    const udata = await axios.post('/api/user_data', { "token": jwt_token }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (udata.status === 200 && udata.data) {
      //console.log(udata);
      const user_data = udata.data.data.user_data;
      //const fdata = udata.data.fdata.fdata;
      return user_data;
    } else {
      window.location.href = '/login';
      document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

/*
const get_user_data = (jwt_token) => {
    axios.post('/api/user_data', {"token" : jwt_token}, {
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type for form data
        },
      })
      .then(function (udata) {
        if(udata.status === 200 && udata.data){
            const user_data = udata.data.data.user_data;
            return user_data;
          //console.log(udata.data.data.user_data);
        }
        else { window.location.href = '/login'; document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;' 
            return null;
        }
      })
      .catch(function (error) {
    console.log(error);
    return null;
  });
}
*/

module.exports = get_user_data;