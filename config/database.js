
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const connectDB = async (request, response) =>{
  const options = {
    dbName: 'onepieceuniverse',
    useUnifiedTopology: true,
  }
  try{
    const conn = await mongoose.connect(process.env.DB_STRING, options)
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  }
  catch(err){
    console.log(`What are we doing!? ${err}`);
    process.exit(1);
  }
  // MongoClient.connect(process.env.DB_STRING, {useUnifiedTopology: true})
  // .then(client =>{
  //   console.log(`Connected to ${dbName} Database`);
  //   db = client.db(dbName)
  // })
  // .catch(err =>{
  //   console.log(`Can't connect to it! ${err}`);
  // })

}
  module.exports = connectDB;