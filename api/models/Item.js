/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    reference: {
      type: 'string'
    },
    price: {
      type: 'float'
    },
    applications: {
      collection: 'Application',
      via: 'items'
    }
  }
};

