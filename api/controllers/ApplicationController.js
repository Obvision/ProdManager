/**
 * ApplicationController
 *
 * @description :: Server-side logic for managing Applications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    Application.create(req.params.all()).exec(function (error, result) {
      if (error) {
        res.json({
          error: "DB Error"
        });
      } else {
        res.json(result);
      }
    });
  },

  getById: function (req, res, next) {
    Application.findOne({
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
    Application.find().populateAll().exec(function (err, result) {
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
    Application.destroy({
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

