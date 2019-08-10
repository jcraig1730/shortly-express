const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  req.session = {};
  models.Sessions.create().then(session => {
    models.Sessions.get({id: session.insertId}).then(data => {
      req.session.hash = data.hash;
    }).then(() => {
      next();
    });
  });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

