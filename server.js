const express = require('express');
const app = express();
app.use(express.static('public'));
const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
const mongo = require('mongodb').MongoClient;
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}));

app.set('views', './views');
app.set('view engine', 'mustache');


mongo.connect('mongodb://localhost:27017/test', function(err, db) {
  const robotList = db.collection('robots');
  app.get('/', function(req, res) {
    robotList.find().toArray().then(function(robotList) {
      res.render('robojob', {
        allRobots: robotList,
      });
    });
  });
  app.post('/noJob', function(req, res) {
    robotList.find({job: null}).toArray().then(function(robotList) {
      res.render('robojob', {
        allRobots: robotList,
      });
    });
  });
  app.post('/haveJobs', function(req, res) {
    robotList.find({job: {$ne: null}}).toArray().then(function(robotList) {
      res.render('robojob', {
        allRobots: robotList,
      });
    });
  });
  app.get('/skills/:id', function(req, res) {
    robotList.find({skills: req.params.id}).toArray().then(function(robotList) {
      res.render('robojob', {
        allRobots: robotList,
      });
    });
  })
  app.get('/country/:id', function(req, res) {
    robotList.find({"address.country" : req.params.id}).toArray().then(function(robotList) {
      res.render('robojob', {
        allRobots: robotList,
      });
    });
  })
  app.listen(3000);
});
