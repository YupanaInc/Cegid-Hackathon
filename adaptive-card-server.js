var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/post', function (req, res) {
  console.log(`\nrequest body - ${JSON.stringify(req.body)}`);
  res = res.status(200);
  res.send();
});

http.createServer(app).listen(3000);