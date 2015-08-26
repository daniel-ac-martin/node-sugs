'use strict';

var
  express = require('express'),
  app     = express(),
  path    = require('path'),
  config  = require('./config');

// 0. Misc configuration
////////////////////////////////////////////////////////////////////////////////

app.use('/public', express.static(path.resolve(__dirname, './public')));

app.use(function(req, res, next) {
  res.locals.assetPath = '/public';
  res.locals.baseUrl   = req.baseUrl;
  next();
});

require('hmpo-govuk-template').setup(app);
app.set('view engine', 'html');
app.engine('html', require('hogan-express-strict'));
app.set('views', path.resolve(__dirname, './views'));
app.use(require('express-partial-templates')(app));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // Do I need this?

//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));

// 1. Grab countries data
////////////////////////////////////////////////////////////////////////////////
var fileUrl = 'https://restcountries.eu/rest/v1/region/Europe',
    target = './routes/fields/countries.json';

function download(fileUrl, target, callback) {
  var
    fs      = require('fs'),
    temp    = target + '~',
    file = fs.createWriteStream(temp)
      .on('error', function(err){
        console.log('Warning: Could not write to ' + temp);
        console.log(err);
        callback(err);
      })
      .on('open', function(){
        var
          https   = require('https'),
          url     = require('url');

        https.get(fileUrl, function(res) {
          res
            .on('data', function(data){
              file.write(data);
            })
            .on('end', function(){
              file.end(function(){
                console.log('Downloaded ' + fileUrl + ' to ' + target);

                // Replace the old file
                fs.renameSync(temp, target);

                callback(null, target);
              });
            });
        })
          .on('error', function(err){
            console.log('Warning: Unable to download ' + fileUrl);
            console.log(err);

            file.end(function(){
              // Delete the temporary file
              fs.unlink(temp);
            });

            callback(err);
          });
      });
}

download(fileUrl, target, function(err){
  // 2. Set-up hmpo-template-mixins
  //////////////////////////////////////////////////////////////////////////////
  var
    mixins = require('hmpo-template-mixins'),
    i18n   = require('i18n-future')(),
    fields = require('./routes/fields');

  app.use(mixins(i18n.translate.bind(i18n), fields));

  // 3. Set-up mongoose
  //////////////////////////////////////////////////////////////////////////////
  var
    mongoose = require('mongoose'),
    mongoUrl    = 'mongodb://' +
      (config.db.user
        ? config.db.user +
          (config.db.pass
            ? ':' + config.db.pass
            : '') + '@'
        : '') + config.db.host +
      (config.db.port
        ? ':' + config.db.port
        : '') + '/' + config.db.name;

  mongoose.connect(mongoUrl);
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', function (callback) {
    console.log('Connected to mongodb at ' + mongoUrl);

    // 4. Set-up routes
    ////////////////////////////////////////////////////////////////////////////
    app.use(require('./routes'));

    // development only
    //if ('development' == app.get('env')) {
    //  app.use(express.errorHandler());
    //}

    // 5. Start the app!
    ////////////////////////////////////////////////////////////////////////////
    app.listen(config.port, config.listen_host);

    //debug('App listening on port %o', config.port);
    console.log('App listening on port', config.port);
  });
});
