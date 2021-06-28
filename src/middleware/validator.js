'use strict';

module.exports = (req, res, next) => {
  if (Object.keys(req.query).length) {
    next();
  } else {
    next('add name proparity');
  }
};
