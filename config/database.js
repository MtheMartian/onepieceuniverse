const dbName = 'onepieceuniverse';
//const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const connectDB = () =>{
  MongoClient.connect(process.env.DB_STRING, {useUnifiedTopology: true})
  .then(client =>{
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName)
  })
  .catch(err =>{
    console.log(`Can't connect to it! ${err}`);
  })

}
  module.exports = connectDB;