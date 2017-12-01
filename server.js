var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 8000;

var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = 27017;
var mongoUser = "cs290_destafen";
var mongoPassword = "lambda127";
var mongoDBName = "cs290_destafen";

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoConnection = null;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('./'))

app.get('/', function(req, res)
{
  res.status(200);
  res.sendFile("index.html");
});

// app.post('/addPrinter', function (req, res) {
//   // need to create a database first before implementing this part
// });

app.use('*', function (req, res)
{
  res.status(404);
  res.sendFile(__dirname + "/404.html");
});

MongoClient.connect(mongoURL, function (err, connection) {
  if (err)
  {
    throw err;
  }
  mongoConnection = connection;
  app.listen(port, function ()
  {
    console.log("== Database Connected to: ", mongoHost);
    console.log("== Database name: ", mongoDBName);
    console.log("== Server listening on port:", port);
  });
});
