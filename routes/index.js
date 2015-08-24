'use strict';

var path = require('path');

/*
 * GET home page.
 */
var FormModel = new require('../models/form');

exports.index = function(req, res){
  res.render(path.join('pages', 'index'), { title: 'Index' });
};

exports.form = function(req, res){
  res.render(path.join('pages', 'form'));
};

exports.form_submission = function(req, res){
  var queryString = (undefined === req.body.name || '' === req.body.name)
    ? ''
    : '?name=' + req.body.name;

  // Validate! FIXME
  // Insert into database
  var model = new FormModel({
    name:    req.body.name,
    isMale:  ('male' === req.body.sex) ? 1 : 0,
    age:     req.body.age,
    country: req.body.country
  });

  model.save(function(err){
    err
      ? console.log('Error: ' + err)
      : res.redirect('/form-complete' + queryString);
  });
};

exports.form_complete = function(req, res){
  var name = (undefined === req.query.name)
    ? ''
    : req.query.name;

  res.render(path.join('pages', 'form-complete'), { name: name });
};

exports.results = function(req, res){
  FormModel.find(function (err, data){
    err
      ? console.error(err) // FIXME: Send error page?
      : res.render(path.join('pages', 'results'), { data: data });
  });
};
