const client = require('mongodb').MongoClient;
let data = require('./data');

client.connect('mongodb://localhost:27017/test', function(err, db){
  let robots = db.collection('robots');

  for (let i = 0; i < data.users.length; i++) {
    robots.insert(data.users[i]);
  }
  db.close();
});
