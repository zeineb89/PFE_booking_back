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

// STRIPE ----------------------------------------
const keyPublishable = "pk_test_etsvRhuRHhEZdlGzTZMuFon7";
;
const keySecret = "sk_test_163HDPvcdLF2D3xkhYfqej2000MOn48Gou";

const stripe = require("stripe")(keySecret);



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

var indexRouter = require('./api/routes/index');
var usersRouter = require('./api/routes/users');
var carsRouter = require('./api/routes/cars');
var addressesRouter = require('./api/routes/addresses');
var rentingsRouter = require('./api/routes/rentings');
var devicesRouter = require('./api/routes/devices');
var brandsRouter = require('./api/routes/brands');

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/addresses', addressesRouter);
app.use('/uploads', express.static('uploads'));

// private route
app.use('/rentings', rentingsRouter);
app.use('/devices', devicesRouter);
app.use('/brands', brandsRouter);

app.post("/charge", (req, res) => {
  console.log("req.body ---------------------------------------------------------")
  console.log(req.body)
  let amount = 500;
  console.log(req.body.id)
  // stripe.customers.create({
  //   email: req.body.email,
  //   card: req.body.id
  // })
  // .then(customer =>
    stripe.charges.create({
      amount: 999,
      source: req.body.id,
      description: "Sample Charge",
      currency: "eur",
    })
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  });

  // amount: 999,
  //   currency: 'usd',
  //   description: 'Example charge',
  //   source: token,
  //   metadata: {order_id: 6735},

  // const charge = await stripe.charges.create({
  //   amount: total,
  //   currency: "usd",
  //   source: token.id, // obtained with Stripe.js
  //   description: "Charge "+args.card_name,
  //   metadata: {order_id: args.order_id}
  // })
});

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})


const upload = multer({ storage: Storage })



app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body)
  console.log(req.files.path)
  res.status(200).json({
    message: 'success!',
    image : req.files[0].path
  })
})
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
