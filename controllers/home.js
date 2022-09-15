const Character = require('../models/Character');
const User = require('../models/User');

module.exports = {
  getIndex: async (request, response) =>{
    console.log(request);
    const users = request.user;
    try{
      const characters = await Character.find().lean();
      response.render('index', {info: characters, user: users});
    }
    catch(err){
      console.log(`Didn't find anything! ${err}`);
    }
  },
  getInfo: async (request, response) =>{
    try{
      const characters = await Character.find().lean();
      response.send(characters);
    }
    catch(err){
      console.log(`Where they at? ${err}`);
    }
  },
  getWelcomePage: async (request, response) =>{
    try{
      await response.render('welcomepage.ejs');
    }
    catch(err){
      console.log(err);
    }  
  },
}
