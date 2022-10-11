const Character = require('../models/Character');
const cloudinary = require('../middleware/cloudinary');

module.exports = {
  createCard: async (request, response) =>{
    //Generate random letters for ID
    const lettersArr = ['ab', 'bc', 'cd', 'de', 'ef', 'fg', 'gh',
    'hi', 'ij', 'jk', 'kl', 'lm', 'mn', 'no',
    'op', 'pq', 'qr', 'rs', 'tu', 'uv', 'vw',
    'wx', 'xy', 'yz'];

    const letterAr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
                        'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const idRandomizer = (Math.ceil(Math.random()*100000) + 
    Math.ceil(Math.random()*Date.now()) + 
    lettersArr[Math.ceil(Math.random()*lettersArr.length)] + 
    Math.ceil(Math.random()*1000000) + 
    letterAr[Math.ceil(Math.random()*letterAr.length)]).toString();
  //-------------------------------
    try{
      // const imageFile = await cloudinary.uploader.upload(request.body.imgURL);
      await Character.create(
        {charName: request.body.charName, charAge: request.body.charAge,
          charFruit: request.body.charFruit, charhaki: request.body.charHaki,
          charRank: request.body.charRank,
          imgURL: request.body.imgURL,
          id: idRandomizer,
          pirate: request.body.pirate,
          marine: request.body.marine,
          description: [{
            charDesc: "",
            bounty: request.body.bounty,
            imgBountyURL: "",
            location: request.body.location,
            specificLocation: request.body.specificLocation,
            numAbilities: request.body.numAbilities,
            altCharImg: ""
          }],
          superAdmin: request.body.superAdmin,
          userID: request.body.userID,  
          userName: request.user.userName,              
        })
        console.log('Character added!');
        response.redirect('/');
    }
    catch(err){
      console.log(`Was unable to add character! ${err}`);
    }
  },
  editCard: async (request, response) =>{
    try{
      // const imageFile = await cloudinary.uploader.upload(request.file.path);
      await Character.findOneAndUpdate({id: request.body.itemFromJS},{
        $set: {
            charName: request.body.charNameU,
            charAge: request.body.charAgeU,
            charFruit: request.body.charFruitU,
            charhaki: request.body.charHakiU,
            charRank: request.body.charRankU,
            imgURL: request.body.imgURLU,
            'description.$[].bounty.bountyAmount': request.body.bountyU,
            'description.$[].location': request.body.generalLocationU,
            'description.$[].specificLocation': request.body.specificLocationU,
          }
        },
        {
          upsert: false
        });
        console.log(`Updated!`);
        response.redirect('/');
    }
    catch(err){
      console.log(`Ruh oh! ${err}`);
    } 
  },
  removeCard: async (request, response) =>{
    try{
      const checkCloudinaryId = await Character.findOne({id: request.body.itemFromJS});
      if(checkCloudinaryId.cloudinaryId !== "" || checkCloudinaryId.cloudinaryId == 'undefined'){
        await cloudinary.uploader.destroy(checkCloudinaryId.cloudinaryId)
        await Character.findOneAndRemove({id: request.body.itemFromJS})
      }
      else{
        await Character.findOneAndRemove({id: request.body.itemFromJS})
      }
      console.log('Deleted!');
      response.redirect('/');
    }
    catch(err){
      console.log(`Shoot, it didn't work! ${err}`);
    }
  },
  uploadCardImg: async (request, response) =>{
    try{
      console.log(request);
      const result = await cloudinary.uploader.upload(request.file.path);
      const checkCloudinaryId = await Character.findOne({id: request.params.id});
      
      if(checkCloudinaryId.cloudinaryId !== "" || checkCloudinaryId.cloudinaryId == 'undefined'){
        await cloudinary.uploader.destroy(checkCloudinaryId.cloudinaryId)
        await Character.findOneAndUpdate({id: request.params.id},{
          '$set': {
            imgURL: result.secure_url,
            cloudinaryId: result.public_id
          }
        });
      }
      else{
        await Character.findOneAndUpdate({id: request.params.id},{
          '$set': {
            imgURL: result.secure_url,
            cloudinaryId: result.public_id
          }
        });
      }
      console.log('File successfully uploaded!');
      response.redirect('/home');
    }
    catch(err){
      console.log(`File upload failed! ${err}`);
    }
  },
  likeCard: async (request, response) =>{
    try{
      const character = await Character.findOne({id: request.params.id}).lean();
      if(character.likes.whoLiked.includes(request.user.userID) == false){
        await Character.findOneAndUpdate({id: request.params.id}, {
          '$set': {
            'likes.numberOfLikes': ++character.likes.numberOfLikes,
          },
          '$push': {
            'likes.whoLiked': request.user.userID
          }
        });
      }
      else{
        const newWhoLikedArr = character.likes.whoLiked.filter(user =>{
            if(user == request.user.userID){
              return false;
            }
            else{
              return true;
            }
          });
        await Character.findOneAndUpdate({id: request.params.id}, {
          '$set': {
            'likes.numberOfLikes': --character.likes.numberOfLikes,
            'likes.whoLiked': newWhoLikedArr,
          }
        });
      }
    console.log('Upvoted!')
    response.end();
  }
  catch(err){
    console.log(`Couldn't Upvote. ${err}`);
  }
  },
  getCharacter: async (request, response) =>{
    try{
      const character = await Character.findOne({id: request.params.id});
      response.send(character);
    }
    catch(err){
      console.log(`Couldn't get requested character! ${err}`);
    } 
  },
  getSortedCards: async (request, response) =>{
    let cardsBasedOnLikes = [];
    let recentlyCreated = [];
    try{
      cardsBasedOnLikes = await Character.find().sort({'likes.numberOfLikes': -1});
      recentlyCreated = await Character.find().sort({createdAt: -1});
      response.send({featured: cardsBasedOnLikes, recent: recentlyCreated});
    }
    catch(err){
      console.log(`Can't do that. ${err}`);
    }
  }
}