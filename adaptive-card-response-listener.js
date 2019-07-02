var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

const mailManager = require('./MailManager.js').MailManager;
const {categoryRecorded, emailAccount} = require('./config.js');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/post', function (req, res) {
  const emailIdsToProcess = Object.keys(req.body).filter(emailId => req.body[emailId] === "true");
  console.log(`Emails to process ${JSON.stringify(emailIdsToProcess)}`);

  emailIdsToProcess.forEach(async emailId => {
    console.log(`\n>> Add tag ${categoryRecorded} to email ${emailId}`);
    await mailManager.setTag(emailAccount, emailId, categoryRecorded)
  });

  res = res.status(200);
  res.send();
});

http.createServer(app).listen(3000);
