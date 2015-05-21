/**
 * Application.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    ref: {
      type: 'string'
    },
    items: {
      collection: 'Item',
      via: 'applications'
    },
    owner:{
      model: 'User'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },
    isFinancialyValidated: {
      type: 'boolean',
      defaultsTo: false
    },
    isAdministrativelyValidated: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  beforeCreate: function (values, next) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1 + "";
    var day = d.getDate();
    var hour = d.getHours();
    var min = d.getMinutes();

    year = year.toString().substr(2, 2);
    if (month.length == 1) {
      month = "0" + month;
    }
    day = day + "";

    if (day.length == 1) {
      day = "0" + day;
    }
    hour = hour + "";

    if (hour.length == 1) {
      hour = "0" + hour;
    }

    min = min + "";

    if (min.length == 1) {
      min = "0" + min;
    }
    values.ref = "A" + year + month + day + hour + min;
    next();
  }
};

