const Character = require('../models/Character');
const charactercard = require('./charactercard');

module.exports = {
  getIndex: async (request, response) =>{
    try{
      const characters = await Character.find()
      response.render('index', {info: characters});
    }
    catch(err){
      console.log(`Didn't find anything! ${err}`);
    }
  },
  getInfo: async (request, response) =>{
    try{
      const characters = await Character.find()
      response.send(characters);
    }
    catch(err){
      console.log(`Where they at? ${err}`);
    }
  }
}
