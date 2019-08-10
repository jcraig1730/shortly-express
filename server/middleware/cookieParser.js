const models = require('../models');

const parseCookies = (req, res, next) => {
  let { cookie } = req.headers;
  if (cookie) {
    cookieList = cookie.split('; ');
    cookieList = cookieList.map(cookie => {
      return cookie.split('=');
    });
    let cookieObj = {};
    cookieList.forEach(cookieTuple => {
      cookieObj[cookieTuple[0]] = cookieTuple[1];
    });

    req.cookies = cookieObj;
  }
  next();
};

module.exports = parseCookies;