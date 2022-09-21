const Character = require('../models/Character');
const Comments = require('../models/Comments');
const User = require('../models/User');

module.exports = {
  getIndex: async (request, response) =>{
    const users = request.user;
    try{
      const characters = await Character.find().lean();
      const userComments = await Comments.find().lean();
      response.render('index', {info: characters, user: users, comments: userComments});
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
