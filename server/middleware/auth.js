const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (!req.session) {
    req.session = {};
    req.session.user = {};
  }
  if (req.cookies) {
    models.Sessions.get({hash: req.cookies.shortlyid}).then(results => {
      req.session.user.username = results.user.username;
      req.session.userId = results.userId;
    }).catch(err => console.log(err))
  }
  console.log(req.session)
  models.Sessions.create()
    .then(session => {
      return models.Sessions.get({id: session.insertId}
    )
    .then(data => {
      req.session.hash = data.hash;
      if (!res.cookies.shortlyid) {
        res.cookies.shortlyid = {};
        res.cookies.shortlyid.value = data.hash;
      }
      })
      .then(() => {
        next();
      });
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

