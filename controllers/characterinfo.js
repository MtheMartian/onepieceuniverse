const Character = require('../models/Character');

module.exports = {
  moreInfo: async (request, response) =>{
    try{
      const character = await Character.find();
      response.render('characterinfo.ejs', {info: character});
    }
    catch(err){
      console.log(`Couldn't find it. ${err}`);
    }
  }
}