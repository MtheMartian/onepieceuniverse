const dbName = 'onepieceuniverse';
const mongoose = require('mongoose');

const connectDB = async () =>{
  try{
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useUnifiedTopology: true,
      useUNewUrlParser: true,
      useFindAndModify: false
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
}
// MongoClient.connect(process.env.DB_STRING, {useUnifiedTopology: true})
//   .then(client =>{
//     console.log(`Connected to ${dbName} Database`);
//     db = client.db(dbName)
//   })

  module.exports = connectDB;