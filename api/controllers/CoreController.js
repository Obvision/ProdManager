/**
 * Created by badrich on 25/05/15.
 */
/**
 * CoreController
 *
 * @description :: Server-side logic for managing Cores
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    if (req.session.authenticated) {
      res.redirect('/app')
    }
    return res.redirect('login');
  },

  app: function (req, res) {
    res.view()
  },

  signup: function (req, res) {
    if (req.session.authenticated) {
      res.redirect('/app')
    }
    res.view();
  },

  login: function (req, res) {
    if (req.session.authenticated) {
      return res.redirect('/app')
    } else {
      return res.view('session/login');
    }
  }

};

