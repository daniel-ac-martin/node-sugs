'use strict';

var mongoose   = require('mongoose');
var formSchema = mongoose.Schema({
  name:        String,
  sex:         Boolean,
  age:         Number,
  country:     String,
  dateCreated: { type: Date, default: Date.now }
});

formSchema.methods.gender = function(){
  return this.sex
    ? 'Male'
    : 'Female'; // FIXME: Should we use translation here?!
};

var FormModel  = mongoose.model('userdata', formSchema);

module.exports = FormModel;
