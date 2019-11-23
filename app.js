var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var tlRouter = require('./service/TLClient');

var app = express();

var port = '3000';
app.set('port', port);

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// app.use('/', indexRouter);
// app.use('/tl', tlRouter);

app.listen(3000, function () {
  console.log(`App listening on http://localhost:${port}`);
});
