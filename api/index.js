// dependencies
var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    config     = require('./config'),
    corser = require('corser'),
    mongoose   = require('mongoose');
// connect database
mongoose.connect(config.db.database);
// config api
var router = express.Router();
app.set('port', 1337)
app.use(corser.create());
app.use(router)

app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(function(req, res, next) {
  res.header('X-Modelo-now');
  next();
});
// == Router ==
var router = express.Router();
app.use(router)
// == endpoints ==
require('./controllers/articles')(router);
require('./controllers/orders')(router);
require('./controllers/users')(router);
require('./controllers/trigger')(router);
require('./controllers/near_location')(router);
// listen server
var server = app.listen(app.get('port'), function(err){
  if(!err){
    console.log('Server listen on port: ' + app.get('port'));
  }
})
// socket
var io = require('socket.io').listen(server);
