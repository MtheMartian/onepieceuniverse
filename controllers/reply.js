const Reply = require('../models/Reply');
const Comments = require('../models/Comments');

module.exports = {
  getReplies: async (request, response) =>{
    try{
      const replies = await Reply.find().lean();
      response.send(replies);
    }
    catch(err){
      console.log(`Couldn't get the replies! ${err}`);
    }
  },
  postReply: async (request, response) =>{
    try{
      await Reply.create({
        comment: request.body.reply,
        userName: request.user.userName,
        userID: request.user.userID,
        userProfilePic: request.user.profilePicture,
        commentID: request.params.id,
      })
      console.log('Reply posted!');
      // response.redirect('/home');
    }
    catch(err){
      console.log(`Couldn't post reply! ${err}`);
    }
  },
  markAsSeenAndReply: async (request, response) =>{
    try{
       await Reply.create({
        comment: request.body.reply,
        userName: request.user.userName,
        userID: request.user.userID,
        userProfilePic: request.user.profilePicture,
        commentID: request.params.id,
      });

      await Comments.findOneAndUpdate({_id: request.params.id}, {
        '$set': {
          seen: true,
        }
      })
      console.log('Reply posted!');
      // response.redirect('/home');
    }
    catch(err){
      console.log(`Couldn't post reply! ${err}`);
    }
  },
  likeReply: async (request, response) =>{
    try{
        const replies = await Reply.findById({_id: request.params.id}).lean();
        if(replies.likes.whoLiked.includes(request.user.userID) == false){
          await Reply.findOneAndUpdate({_id: request.params.id}, {
            '$set': {
              'likes.numberOfLikes': ++replies.likes.numberOfLikes,
            },
            '$push': {
              'likes.whoLiked': request.user.userID
            }
          });
        }
        else{
          const newWhoLikedArr = replies.likes.whoLiked.filter(user =>{
              if(user == request.user.userID){
                return false;
              }
              else{
                return true;
              }
            });
          await Reply.findOneAndUpdate({_id: request.params.id}, {
            '$set': {
              'likes.numberOfLikes': --replies.likes.numberOfLikes,
              'likes.whoLiked': newWhoLikedArr,
            }
          });
        }
      console.log('Upvoted!')
      response.send(replies);
    }
    catch(err){
      console.log(`Couldn't Upload. ${err}`);
    }
  }
}