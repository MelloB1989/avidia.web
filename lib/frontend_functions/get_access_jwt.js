const get_access_jwt = () => {
  try {
    // Read the ACCESS_TOKEN from cookies
    const jwt_token = document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    if(jwt_token) return jwt_token;
    else document.cookie = "app_token" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'; return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = get_access_jwt;