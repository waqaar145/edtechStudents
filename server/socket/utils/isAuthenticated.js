const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const config = require("./../../config/config");

module.exports.isAuthenticated = async (socket) => {
  let cookieString = socket.handshake.headers.cookie;
  if (cookieString) {
    let parsedCookie = cookie.parse(cookieString);
    const sidParsed = cookieParser.signedCookie(
      parsedCookie[config.COOKIE_NAME],
      config.SESSTION_SECRET
    );
    try {
      let connectedUser = await store.get(sidParsed); 
      // this is database query, 
      // we can change this to redis session or cache so the database call can be reduced or may be use jwt
      // becasue this is going to be too frequent calls
      if (!connectedUser) {
        return false;
      }
      let user = connectedUser.passport.user;
      socket.currentConnectedUser = user;
      return user;
    } catch (error) {
      console.log(error)
    }
  }
  return false;
};
