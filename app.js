var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/foodcart',function(err){
  console.log(err,"This Is Error");
  console.log("connected to Database");
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
var products=require('./server/product/routes/index.js');
var order=require('./server/order/routes/index.js');


app.use('/product',products);
app.use('/order',order);
// app.use('/',function(req, res) {
// res.json("This Is text('some text')")
//   // var err = new Error('Not Found');
//   // err.status = 404;
//   // next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// 
app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
  });
}


module.exports = app;
