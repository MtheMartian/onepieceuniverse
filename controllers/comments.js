const Comments = require('../models/Comments');

module.exports = {
  postComment: async (request, response) =>{
    try{
      await Comments.create({
        comment: request.body.comment,
        userID: request.user.userID,
        userProfilePicture: request.user.profilePicture,
        cardID: request.body.cardID,
      })
      console.log('Comment posted!');
      response.redirect('/home');
    }
    catch(err){
      console.log(`Couldn't post the comment! ${err}`);
    }
  },
  getComments: async (request, response) =>{
    try{
      const comments = await Comments.find().lean();
      response.send(comments);
    }
    catch(err){
      console.log(`Couldn't get them. ${err}`);
    }
  }
}