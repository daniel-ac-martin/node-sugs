'use strict';

var
  path = require('path');

function IndexController(req, res)
{
  res.render(path.join('pages', 'index'), { title: 'Index' });
}

module.exports = IndexController;
