const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const connectDB = require('./config/database');
const app = express();

require('dotenv').config({path: './config/.env'});

connectDB();

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

app.get('/getInfo', (request, response) =>{
  db.collection('characters').find().toArray()
  .then(data =>{
    response.send(data);
  })
  .catch(err =>{
    console.log(`Nooo! ${err}`);
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

app.delete('/deleteCard', (request, response) =>{
  db.collection('characters').deleteOne({id: request.body.itemFromJS})
  .then(result =>{
    console.log('Deleted!');
    response.redirect('/');
  })
  .catch(err =>{
    console.log(`Shoot, it didn't work! ${err}`);
  })
})

app.listen(process.env.PORT, () =>{
  console.log(`Server running on port ${process.env.PORT}`);
})