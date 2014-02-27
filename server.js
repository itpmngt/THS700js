var express = require('express');
var app = express();

app.configure(function () {
  app.use(express.methodOverride());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router);
  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);
  app.use(express.static(__dirname + '/app'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) { res.send(500, { error: 'Something blew up!' }); }
  else { next(err); }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.get('/', express.static(__dirname + '/app/index.html'));

app.listen(3000);
console.log('Listening on port 3000');