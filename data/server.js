const express = require('express');
const mustache = require('mustache-express');
const mongo = require('mongodb').MongoClient;

const app = express();

app.engine('mustache', mustache);
app.set('views', './views');
app.set('view engine', 'mustache');

// List all of the foods
app.get('/foods',function(req,res){
  //Get data from mongo
  // List it using mustache

  items.find().toArray.then(function(items){
    res.render('food',{
      noms: items,
    });
  });

  res.render('foods'{});
});

app.listen(3000);
