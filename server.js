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
  var printerDataCollection = mongoConnection.collection('printerData');
  printerDataCollection.find({}).toArray(function (err, results){
    if(err)
    {
      res.status(500).send("Error fetching people from DB");
    }
    else
    {
      console.log("== query resutls: ", results);
      res.status(200).render('homePage',
      {
        printers:results
      });
    }
  });
});

<<<<<<< HEAD
app.post('/addPrinter', function (req, res) {
  // need to create a database first before implementing this part
  
});
=======
 app.post('/addPrinter', function (req, res)
 {
   if(req.body)
   {
     var printerDataCollection = mongoConnection.collection('printerData');
     console.log("==Req.body", req.body);
     printerDataCollection.insert(
      req.body,
      
       function (err, result)
       {
         if(err)
         {
           res.status(500).send("Error fetching printer from DB");
         }
         else
         {
           res.status(200).send("Success");
         }
       }
     );

   }
   else {
     res.status(400).send("Request body is missing a field.")
   }
 });
>>>>>>> 05868f1be5d517a793b9d7511a84909c156a09d7

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
