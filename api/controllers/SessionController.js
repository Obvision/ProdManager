/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {
  create: function (req, res, next) {

    if (!req.param('email') || !req.param('password')) {
      var usernamePasswordRequiredError = [{
        name: 'usernamePasswordRequired',
        type: 'Oops !',
        message: 'Vous devez saisir votre identifiant et mot de passe.'
      }];

      req.session.flash = {
        err: usernamePasswordRequiredError
      };

      return res.redirect('/login');
    }

    User.findOneByEmail(req.param('email')).exec(function (err, user) {
      if (err) return next(err);

      if (!user) {
        var noAccountError = [{
          name: 'noAccount',
          type: 'Oops !',
          message: "L'adresse e-mail " + req.param('email') + " n'existe pas."
        }];
        req.session.flash = {
          err: noAccountError
        };

        return res.redirect('/login');
      }

      bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
        if (err) return next(err);

        if (!valid) {
          var usernamePasswordMismatchError = [{
            name: 'usernamePasswordMismatch',
            type: 'Oops !',
            message: 'Le mot de passe que vous avez saisi est incorrect.'
          }];
          req.session.flash = {
            err: usernamePasswordMismatchError
          };

          return res.redirect('/login');
        }

        req.session.authenticated = true;
        req.session.user = user;
        user.online = true;
        user.logoutAt = new Date();

        user.save(function (err, user) {
          if (err) return next(err);
          return res.redirect('/app');
        });

      })
    })
  },

  destroy: function (req, res, next) {
    if (!req.session.authenticated) {
      return res.redirect('/index');
    } else {
      User.findOne(req.session.user.id, function foundUser(err, user) {
        var userId = req.session.user.id;

        User.update(userId, {
          online: false,
          logoutAt: new Date()
        }, function (err) {
          if (err) return next(err);
          req.session.destroy();
          return res.redirect('/login');
        });
      });
    }
  }
};
