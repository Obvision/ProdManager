/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    Item.create(req.params.all()).exec(function (error, result) {
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
    Item.findOne({
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
    Item.find().populateAll().exec(function (err, result) {
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
    Item.destroy({
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

