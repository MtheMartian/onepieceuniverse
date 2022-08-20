module.exports = {
  createCard: (request, response) =>{
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
  },
  editCard: (request, response) =>{
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
    })
    .catch(err =>{
      console.log(`Ruh oh! ${err}`);
    })
  },
  removeCard: (request, response) =>{
    db.collection('characters').deleteOne({id: request.body.itemFromJS})
    .then(result =>{
      console.log('Deleted!');
    })
    .catch(err =>{
      console.log(`Shoot, it didn't work! ${err}`);
    })
  }
}