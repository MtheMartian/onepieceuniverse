const Characters = require('../models/Character');
const Users = require('../models/User');
const { models, set } = require('mongoose');
const bcrypt = require('bcrypt');
const cloudinary = require('../middleware/cloudinary');

module.exports = {
  getMyProfilePage: async (request, response) =>{
    try{
      const characters = await Characters.find().lean();
      const users = request.user;
      response.render('myprofilepage.ejs', {character: characters, user: users});
    }
    catch(err){
      console.loge(`Couldn't get the page! ${err}`);
    }
  },
  changeUserName: async (request, response) =>{
    const {userName, email, password, userID} = request.user;
    try{
      await Users.findOneAndUpdate({userID: userID}, {
        $set:{
          userName: request.body.userName
        }});
      console.log("Successfully changed the username!");
      console.log(request.user);
      response.redirect('/myprofile');
    }
    catch(err){
      console.log(`Failed to change username. ${err}`);
    }
  },
  changeEmail: async (request, response) =>{
    try{
      await Users.findOneAndUpdate({userID: request.user.userID}, {
        '$set':{
          email: request.body.email
        }});
      console.log("Successfully changed the email!");
      response.redirect('/myprofile');
    }
    catch(err){
      console.log(`Failed to change email. ${err}`);
    }
  },
  changePassword: async (request, response) =>{
    const {userName, email, password} = request.body;
    const hashPassword = await bcrypt.hash(password, 10)
    try{
      await Users.findOneAndUpdate({userID: request.user.userID}, {
        '$set':{
          password: hashPassword
        }});
      console.log("Successfully changed the password!");
      response.redirect('/myprofile');
    }
    catch(err){
      console.log(`Failed to change email. ${err}`);
    }
  },
  uploadCardImgProfilePage: async (request, response) =>{
    try{
      console.log(request);
      const result = await cloudinary.uploader.upload(request.file.path);
      const checkCloudinaryId = await Characters.findOne({id: request.params.id}).lean();
      
      if(checkCloudinaryId.cloudinaryId !== "" || checkCloudinaryId.cloudinaryId == 'undefined'){
        await cloudinary.uploader.destroy(checkCloudinaryId.cloudinaryId)
        await Characters.findOneAndUpdate({id: request.params.id},{
          '$set': {
            imgURL: result.secure_url,
            cloudinaryId: result.public_id
          }
        }).lean();
      }
      else{
        await Characters.findOneAndUpdate({id: request.params.id},{
          '$set': {
            imgURL: result.secure_url,
            cloudinaryId: result.public_id
          }
        });
      }
      console.log('File successfully uploaded!');
      response.redirect('/myprofile');
    }
    catch(err){
      console.log(`File upload failed! ${err}`);
    }
  }
}