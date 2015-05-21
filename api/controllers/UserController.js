/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    User.create(req.params.all()).exec(function (error, result) {
      if (error) {
        res.json({
          error: "DB Error"
        });
      } else {
        res.json(result);
      }
    });
  },

  loggedUser: function (req, res, next) {
    User.findOne({
      'id': req.session.user.id
    }).populateAll().exec(function (err, result) {
      if (err) {
        console.log(err);
        res.send(500, {
          error: err
        });
      } else {
        return res.json(result);
      }
    });
  },

  getById: function (req, res, next) {
    User.findOne({
      'id': req.param('id')
    }).populateAll().exec(function (err, result) {
      if (err) {
        console.log(err);
        res.send(500, {
          error: err
        });
      } else {
        return res.json(result);
      }
    });
  },

  getAll: function (req, res) {
    User.find().populateAll().exec(function (err, result) {
      if (err) {
        res.send(500, {
          error: err
        });
      } else {
        res.json(result);
      }
    });
  },

  drop: function (req, res) {
    User.destroy({
      'id': req.param('id')
    }).exec(function (err, result) {
      if (err) {
        res.send(500, {
          error: err
        });
      } else {
        res.json(result);
      }
    });
  }
};

