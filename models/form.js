'use strict';

/*
var Model = require('../lib/base-model.js');
var util = require('util');

var collectionName = 'userdata';

function FormModel()
{
  Model.apply(this, arguments);
}

util.inherits(FormModel, Model);

function listify(data)
{
  return (typeof(data) == 'undefined')
    ? [data]
    : data;
}

FormModel.prototype.collectionName = collectionName;

FormModel.prototype.decorate = function(data)
{
  data.dateCreated = new Date();
}
*/

var mongoose   = require('mongoose');
var formSchema = mongoose.Schema({
  name:        String,
  isMale:      Boolean,
  age:         Number,
  country:     String,
  dateCreated: { type: Date, default: Date.now }
});

formSchema.methods.sex = function(){
  return this.isMale
    ? 'Male'
    : 'Female'; // FIXME: Should we use translation here?!
};

var FormModel  = mongoose.model('userdata', formSchema);

module.exports = FormModel;
