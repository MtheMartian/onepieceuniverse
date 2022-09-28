const Comments = require('../models/Comments');

module.exports = {
  postComment: async (request, response) =>{
    try{
      await Comments.create({
        comment: request.body.comment,
        userID: request.user.userID,
        userName: request.user.userName,
        userProfilePicture: request.user.profilePicture,
        cardID: request.body.cardID,
      })
      console.log('Comment posted!');
      // response.redirect('/home');
    }
    catch(err){
      console.log(`Couldn't post the comment! ${err}`);
    }
  },
  getComments: async (request, response) =>{
    try{
      const comments = await Comments.find({cardID: request.params.cardID}).lean();
      response.send(comments);
    }
    catch(err){
      console.log(`Couldn't get them. ${err}`);
    }
  },
  likeComment: async (request, response) =>{
    try{
        const comments = await Comments.findById({_id: request.params.id}).lean();
        if(comments.likes.whoLiked.includes(request.user.userID) == false){
          await Comments.findOneAndUpdate({_id: request.params.id}, {
            '$set': {
              'likes.numberOfLikes': ++comments.likes.numberOfLikes,
            },
            '$push': {
              'likes.whoLiked': request.user.userID
            }
          });
        }
        else{
          const newWhoLikedArr = comments.likes.whoLiked.filter(user =>{
              if(user == request.user.userID){
                return false;
              }
              else{
                return true;
              }
            });
          await Comments.findOneAndUpdate({_id: request.params.id}, {
            '$set': {
              'likes.numberOfLikes': --comments.likes.numberOfLikes,
              'likes.whoLiked': newWhoLikedArr,
            }
          });
        }
      console.log('Upvoted!')
      // response.redirect('/home');
    }
    catch(err){
      console.log(`Couldn't Upload. ${err}`);
    }
  }
}