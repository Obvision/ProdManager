/**
 * Created by badrich on 25/05/15.
 */
module.exports = function(req, res, next) {
  res.locals.flash = {};

  if(!req.session.flash) return next();

  res.locals.flash = _.clone(req.session.flash);

  req.session.flash = {};

  next();
};
