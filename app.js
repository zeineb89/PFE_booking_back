var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
//Import the mongoose module
var mongoose = require('mongoose');
const cors = require('cors');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/bookingDB';
mongoose.connect(mongoDB, {useCreateIndex: true, useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var app = express();
// Define schema
// var Schema = mongoose.Schema;

// var SomeModelSchema = new Schema({
//   a_string: String,
//   a_date: Date
// });

// Compile model from schema
//var SomeModel = mongoose.model('SomeModel', SomeModelSchema );

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carsRouter = require('./routes/cars');
var addressesRouter = require('./routes/addresses');
var rentingsRouter = require('./routes/rentings');
var devicesRouter = require('./routes/devices');
var brandsRouter = require('./routes/brands');


app.set('secretKey', 'nodeRestApi'); // jwt secret token

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/addresses', addressesRouter);

// private route
app.use('/rentings', rentingsRouter);
app.use('/devices', devicesRouter);
app.use('/brands', brandsRouter);





// private route
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
