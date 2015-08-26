'use strict';

var
  path      = require('path'),
  FormModel = new require('../models/form');

function ResultsController(req, res)
{
  FormModel.find(function (err, data){
    err
      ? console.error(err) // FIXME: Send error page?
      : res.render(path.join('pages', 'results'), { data: data });
  });
}

module.exports = ResultsController;
