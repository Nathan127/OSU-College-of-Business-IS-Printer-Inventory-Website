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
var brandArr = [''];

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
  '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoConnection = null;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req, res)
{
  var printerDataCollection = mongoConnection.collection('printerData');
  
  printerDataCollection.find({}).toArray(function (err, results){
    if(err)
    {
      res.status(500).send("Error fetching printer from DB");
    }
    else
    {
      console.log("== query results: ", results);
      for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < brandArr.length; j++) {
          if (results[i].brand !== brandArr[j]) {
            brandArr.push(results[i].brand);
          }
        }
      }
      res.status(200).render('homePage',
      {
        rows: results,
        brandOption: brandArr

      });

    }
  });
});

app.get('/contact', function (req, res) {
  res.status(200).render('contact');
});

 app.post('/addPrinter', function (req, res)
 {
   if(req.body)
   {
     var printerDataCollection = mongoConnection.collection('printerData');
     var filterDataCollection = mongoConnection.collection('filterData');
     console.log("== Add printer request", req.body);
      if (filterDataCollection.findOne({brand: req.body.brand}))
     printerDataCollection.insertOne(
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

 app.post('/editPrinter', function (req, res)
 {
   if(req.body)
   {
     var printerDataCollection = mongoConnection.collection('printerData');
     console.log("== Edit printer request", req.body);

     printerDataCollection.updateOne( {name: req.body.name},
      req.body,

       function (err, result)
       {
         if(err)
         {
           res.status(500).send("Error fetching printer from DB");
         }
         else
         {
           res.status(200).send("Success editing 1 printer");
         }
       }
     );

   }
   else {
     res.status(400).send("Request body is missing a field.")
   }
 });

 app.post('/removePrinter', function (req, res)
 {
   if(req.body)
   {
     var printerDataCollection = mongoConnection.collection('printerData');
     console.log('== Remove Printer Request:', req.body);

     printerDataCollection.deleteOne(req.body,
       function (err, result)
       {
         if(err)
         {
           res.status(500).send("Error fetching printer from DB");
         }
         else
         {
           res.status(200).send("Success removing 1 printer");
         }
       }
     );

   }
   else {
     res.status(400).send("Request body is missing a field.")
   }
 });

 app.post('/changeQuantity', function (req, res) {
   if (req.body) {
     var printerDataCollection = mongoConnection.collection('printerData');

     console.log('== Change Quantity Request:', req.body);
     printerDataCollection.updateOne({ name: req.body.name },
      {$set: { ['quantity.' + req.body.index]: req.body.quantity } },
      function (err, result) {
        if (err)
        {
          res.status(500).send("Error fetching printer from DB");
        }
        else
        {
          res.status(200).send("Success changing quantity");
        }
      }
    )
   }
 });

 app.post('/editNotes', function (req, res) {
  if (req.body) {
    var printerDataCollection = mongoConnection.collection('printerData');
    console.log("== Edit note request:", req.body);

    printerDataCollection.updateOne({ name: req.body.name },
     {$set: { notes: req.body.notes } },
     function (err, result) {
       if (err)
       {
         res.status(500).send("Error fetching printer from DB");
       }
       else
       {
         res.status(200).send("Success changing quantity");
       }
     }
   )
  }
});

app.use('*', function (req, res)
{
  res.status(404).render('404');
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
