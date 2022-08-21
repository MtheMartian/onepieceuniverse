const Character = require('../models/Character');

module.exports = {
  createCard: async (request, response) =>{
    try{
      await Character.create(
        {charName: request.body.charName, charAge: request.body.charAge,
          charFruit: request.body.charFruit, charhaki: request.body.charHaki,
          imgURL: request.body.imgURL,
          id: Math.ceil(Math.random()*Date.now()).toString()
        })
        console.log('Character added!');
        response.redirect('/');
    }
    catch(err){
      console.log(`Was unable to add character! ${err}`);
    }
  },
  editCard: async (request, response) =>{
    try{
      await Character.findOneAndUpdate({id: request.body.itemFromJS},{
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
        console.log(`Updated!`);
        response.redirect('/');
    }
    catch(err){
      console.log(`Ruh oh! ${err}`);
    } 
  },
  removeCard: async (request, response) =>{
    try{
      await Character.findOneAndRemove({id: request.body.itemFromJS})
      console.log('Deleted!');
      response.redirect('/');
    }
    catch(err){
      console.log(`Shoot, it didn't work! ${err}`);
    }
  }
}