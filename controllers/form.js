'use strict';

var
  util       = require('util'),
  Controller = require('hmpo-form-wizard').Controller,
  _          = require('underscore'),
  FormModel  = new require('../models/form');

function Finish()
{
  Controller.apply(this, arguments);
}

util.inherits(Finish, Controller);

Finish.prototype.data = function(req){
  // Return form data from the session
  return _.pick(req.sessionModel.toJSON(), Object.keys(require('../routes/fields')));
};

Finish.prototype.locals = function (req, res) {
  // Add 'name' to the locals and reset the session
  var
    name   = this.data(req).name,
    locals = Controller.prototype.locals.call(this, req, res);

  req.sessionModel.reset();

  return _.extend(locals, { name: name });
};

Finish.prototype.getValues = function(req, res, callback){
  // Grab data from session
  var
    data  = this.data(req),
    model = new FormModel({
      name:    data.name,
      sex:     ('male' === data.sex) ? 1 : 0,
      age:     data.age,
      country: data.country
    });

  // Save the data
  model.save(function(err){
    err
      ? console.log('Error: ' + err)
      : Controller.prototype.getValues.call(this, req, res, callback);
  });
};

module.exports = Finish;
