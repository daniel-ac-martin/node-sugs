
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var config = require('./config');

// all environments
//app.set('port', 3000);
//app.set('views', path.join(__dirname, 'views'));

if (config.env === 'development') {
  app.use('/public', express.static(path.resolve(__dirname, './public')));
}

app.use(function setAssetPath(req, res, next) {
  res.locals.assetPath = '/public';
  next();
});

// Swap jade for hogan-express-strict
//app.set('view engine', 'jade');
app.use(function (req, res, next) {
  if(req.baseUrl === undefined)
  {
    req.baseUrl = '';
  }

  next();
});
require('hmpo-govuk-template').setup(app);
app.set('view engine', 'html');
app.engine('html', require('hogan-express-strict'));
app.set('views', path.resolve(__dirname, './views'));
app.use(require('express-partial-templates')(app));

//app.set('view engine', 'html');  // use .html extension for templates
//app.set('layout', 'layout');     // use layout.html as the default layout
////app.set('partials', foo: 'foo'); // define partials available to all pages
//app.enable('view cache');
//app.engine('html', require('hogan-express-strict'));

app.use(function setBaseUrl(req, res, next) {
  res.locals.baseUrl = req.baseUrl;
  next();
});

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.set('port', process.env.PORT || config.port);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
