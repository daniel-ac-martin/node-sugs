'use strict';

var path = require('path');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render(path.join('pages', 'index'), { title: 'Express' });
};
