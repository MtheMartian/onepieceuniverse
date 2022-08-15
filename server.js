const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const ejs = require('ejs');
const cors = require('cors');
const { response } = require('express');
const app = express();
const PORT = 8000;

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'onepieceuniverse'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
  .then(client =>{
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName)
  })

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (request, response) =>{
  db.collection('characters').find().toArray()
  .then(data =>{
    response.render('index.ejs', {info: data});
  })
  .catch(err =>{
    console.log(`Something went wrong! ${err}`);
  })
})

app.post('/addCharacter', (request, response) =>{
  db.collection('characters').insertOne(
    {charName: request.body.charName, charAge: request.body.charAge,
      charFruit: request.body.charFruit, charhaki: request.body.charHaki,
      imgURL: request.body.imgURL,
      id: Math.ceil(Math.random()*Date.now()).toString()
    })
  .then(result =>{
    console.log('Character added!');
    response.redirect('/');
  })
  .catch(err =>{
    console.log(`Was unable to add character! ${err}`);
  })
})

app.put('/updateCard', (request, response) =>{
  db.collection('characters').updateOne({id: request.body.itemFromJS},{
    $set: {
        charName: request.body.charNameU,
        charAge: request.body.charAgeU,
        charFruit: request.body.charFruitU,
        charhaki: request.body.charHakiU,
        imgURL: request.body.imgURLU,
      }
    },
    {
      upsert: false
    })
  .then(result =>{
    console.log(`Updated!`);
    response.redirect('/');
  })
  .catch(err =>{
    console.log(`Ruh oh! ${err}`);
  })
})

app.listen(process.env.PORT || PORT, () =>{
  console.log(`Server running on port ${PORT}`);
})