const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = `'${process.env.DB_URL}'`;
console.log(url);

// Database Name
const dbName = 'travis-monitor';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('repository-info');
  let currentDate = new Date();
  let doc = new Object();
  doc = JSON.parse(
    `{"repository-name": ${
      process.env.BRANCH
    }, "build-state": "false", "latest-build-time": "${currentDate}", "Build Number:" "${
      process.env.BUILD_NUM
    }"}`
  );
  collection.insertOne(doc);
  client.close();
});
