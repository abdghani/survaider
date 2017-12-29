var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./bin/auth')
var index = require('./routes/index');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
  res.header("access-control-allow-methods", "GET, POST, PUT");
  res.header("server", "cloudflare-nginx");
  next();
});

var connectionString = auth.mongooseUrl;
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('survaider db connected');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);


module.exports = app;
