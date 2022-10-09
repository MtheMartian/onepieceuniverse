const Character = require('../models/Character');
const Comments = require('../models/Comments');
const Reply = require('../models/Reply');
const User = require('../models/User');

module.exports = {
  getIndex: async (request, response) =>{
    const users = request.user;
    let cardsBasedOnLikes = [];
    let recentlyCreated = [];
      try{
        const characters = await Character.find().lean().sort({charName: 1});
        cardsBasedOnLikes = await Character.find().sort({'likes.numberOfLikes': -1});
        recentlyCreated = await Character.find().sort({createdAt: -1});
        response.render('index', {info: characters, user: users, 
          featured: cardsBasedOnLikes,
          recent: recentlyCreated,
        });
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
  getSearchCardsPage: (request, response) =>{
    response.render('searchcards.ejs', {user: request.user});
  },
  searchCards: async (request, response) =>{
    try{
      let results = [];
      const cards = await Character.find().lean();
      for(let i = 0; i < cards.length; i++){
        if(cards[i].charName.toLowerCase().includes(request.query.entry) || cards[i].charhaki.hakiUsageLevel.toLowerCase().includes(request.query.entry) 
          || cards[i].charRank.toLowerCase().includes(request.query.entry) || cards[i].charAge.toLowerCase().includes(request.query.entry) 
          || cards[i].charFruit.fruitName.toLowerCase().includes(request.query.entry) || cards[i].charFruit.fruitType.toLowerCase().includes(request.query.entry)){
          results.push(cards[i]);
        }
      }
      response.send(results);
    }
    catch(err){
      console.log(`Messed up somewhere! ${err}`);
    }
  },
  getCurrentSignedInUser: (request, response) =>{
    if(typeof request.user !== 'undefined'){
      response.send(request.user);
    }
  },
  getInboxComments: async (request, response) =>{
    const users = request.user;
    let commentsForCurrentUser = [];
    let cardTitle = [];
    if(typeof users !== 'undefined'){
      try{
        const characters = await Character.find().lean();
        const userComments = await Comments.find().lean();
        for(let i = 0; i < userComments.length; i++){
          for(let j = 0; j < characters.length; j++){
            if(userComments[i].cardID == characters[j].id && 
                users.userID == characters[j].userID && 
                users.userName !== userComments[i].userName && 
                userComments[i].seen === false){
                  commentsForCurrentUser.push(userComments[i]);
                  cardTitle.push(characters[j].charName);
                }
          }
        }
        response.send({newComments: commentsForCurrentUser, cardTitle: cardTitle});
      }
      catch(err){
        console.log(`Didn't find anything! ${err}`);
      }
    }
  },
}
