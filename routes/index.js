'use strict';

var
  router    = require('express').Router(),
  path      = require('path'),
  FormModel = new require('../models/form');

function FormController()
{
}

FormController.prototype.indexAction = function(req, res){
  res.render(path.join('pages', 'index'), { title: 'Index' });
};

FormController.prototype.formAction = function(req, res){
  res.render(path.join('pages', 'form'));
};

FormController.prototype.formSubmissionAction = function(req, res){
  var queryString = (undefined === req.body.name || '' === req.body.name)
    ? ''
    : '?name=' + req.body.name;

  // Validate! FIXME
  // Insert into database
  var model = new FormModel({
    name:    req.body.name,
    sex:     ('male' === req.body.sex) ? 1 : 0,
    age:     req.body.age,
    country: req.body.country
  });

  model.save(function(err){
    err
      ? console.log('Error: ' + err)
      : res.redirect('/form-complete' + queryString);
  });
};

FormController.prototype.formCompleteAction = function(req, res){
  var name = (undefined === req.query.name)
    ? ''
    : req.query.name;

  res.render(path.join('pages', 'form-complete'), { name: name });
};

FormController.prototype.resultsAction = function(req, res){
  FormModel.find(function (err, data){
    err
      ? console.error(err) // FIXME: Send error page?
      : res.render(path.join('pages', 'results'), { data: data });
  });
};

var
  formController = new FormController();

router.get ('/',              formController.indexAction);
router.get ('/form',          formController.formAction);
router.post('/form',          formController.formSubmissionAction);
router.get ('/form-complete', formController.formCompleteAction);
router.get ('/results',       formController.resultsAction);

module.exports = router;
