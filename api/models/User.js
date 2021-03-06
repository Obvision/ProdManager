/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  attributes: {
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    role: {
      model: 'Role'
    },
    applications: {
      collection: 'Application',
      via: 'owner'
    },
    encryptedPassword: {
      type: 'string'
    },
    isDeleted :{
      type: 'boolean',
      defaultsTo: false
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  },

  beforeCreate: function (values, next) {

    if (!values.password || values.password != values.confirmation) {
      return next({
        err: ["Password doesn't match password confirmation."]
      });
    }

    require('bcryptjs').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });

  }
};

