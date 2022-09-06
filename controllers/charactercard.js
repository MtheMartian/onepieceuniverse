const Character = require('../models/Character');

module.exports = {
  createCard: async (request, response) =>{
    try{
      await Character.create(
        {charName: request.body.charName, charAge: request.body.charAge,
          charFruit: request.body.charFruit, charhaki: request.body.charHaki,
          charRank: request.body.charRank,
          imgURL: request.body.imgURL,
          id: Math.ceil(Math.random()*Date.now()).toString(),
          pirate: request.body.pirate,
          marine: request.body.marine,
          description: [{
            charDesc: "",
            bounty: request.body.bounty,
            imgBountyURL: request.body.bountyImgURL,
            location: request.body.location,
            numAbilities: request.body.numAbilities,
            altCharImg: ""
          }],
          superAdmin: request.body.superAdmin,
          userID: request.body.userID,                
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
            charRank: request.body.charRankU,
            imgURL: request.body.imgURLU,
            'description.$[].bounty.bountyAmount': request.body.bountyU,
            superAdmin: request.body.superAdmin,
            userID: request.body.userID,
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