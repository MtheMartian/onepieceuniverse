const Character = require('../models/Character');

module.exports = {
  moreInfoUpdate: async (request, response) =>{
    try{
      console.log(request);
      await Character.findOneAndUpdate({id: request.body.cardId}, {
        "$set": {
          "description.$[].charDesc" : request.body.charDesc,
          "description.$[].bounty.posterBountyURL" : request.body.bountyImgURL,
          "description.$[].numAbilities" : request.body.numAbilities,
        }
      });
      console.log("Updated Description"); 
      response.redirect('/');
    }
    catch(err){
      console.log(`Couldn't find it. ${err}`);
    }
  }
}