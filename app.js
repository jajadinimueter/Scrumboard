var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var uuid = require('node-uuid');
var WebSocketServer = require('ws').Server;

var routes = require('./routes/index');
var tasks = require('./routes/tasks_routes');
var users = require('./routes/users');

var app = express();

var server = app.listen(3000);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/tasks', tasks);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// WS Server
var wss = new WebSocketServer({server: server});
console.log('websocket server created');

var clients = {};
wss.on('connection', function(ws) {
    var userID = uuid.v1();
    clients[userID] = ws;

    console.log('client :' + userID + ' connected');


    ws.on('message', function(message) {
        message = JSON.parse(message);
        console.log('received from ' + userID + ':' + message.title + " - " + message.description);
        for (id in clients ) {
            clients[id].send(JSON.stringify(message));
        }

    });

    ws.on('close', function() {
        console.log('client :' + userID + ' closed connection');
        delete clients[userID];
    });
});

module.exports = app;
