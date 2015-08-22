'use strict';

var path = require('path');

/*
 * GET home page.
 */

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

  res.redirect('/form-complete' + queryString);
};

exports.form_complete = function(req, res){
  var name = (undefined === req.query.name)
    ? ''
    : req.query.name;

  res.render(path.join('pages', 'form-complete'), { name: name });
};

exports.results = function(req, res){
  res.render(path.join('pages', 'results'), { title: 'Results' });
};
