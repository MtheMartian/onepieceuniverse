const Character = require('../models/Character');

module.exports = {
  moreInfoUpdate: async (request, response) =>{
    const updateDocument = {
      $set: {
        "description.$[0].charDesc" : request.body.charDesc,
        "description.$[0].bounty.posterBountyURL" : request.body.bountyImgURL,
        "description.$[0].numAbilities.$[0].ability" : request.body.abilityName,
        "description.$[0].numAbilities.$[0].abilityDesc" : request.body.abilityDesc,
        "description.$[0].numAbilities.$[0].abilityURL" : request.body.abilityURL,
      }
      
    }
    try{
      await Character.findOneAndUpdate({id: request.body.cardId}, {
        $set:{
          
          
        }
      });
      
    }
    catch(err){
      console.log(`Couldn't find it. ${err}`);
    }
  }
}