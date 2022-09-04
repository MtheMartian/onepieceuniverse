const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const flash = require('express-flash');

module.exports = {
  getSignUp: async (request, response) =>{
    try{
       await response.render('signup.ejs');
    }
    catch(err){
      console.log(`Something went wrong! ${err}`);
    }
  },
  postSignUp: async (request, response) =>{
    //Generate random letters for ID
      const lettersArr = ['ab', 'bc', 'cd', 'de', 'ef', 'fg', 'gh',
      'hi', 'ij', 'jk', 'kl', 'lm', 'mn', 'no',
      'op', 'pq', 'qr', 'rs', 'tu', 'uv', 'vw',
      'wx', 'xy', 'yz'];

      const letterAr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                          'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
                          'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    //-------------------------------
    try{
      const res = await User.findOne({email: request.body.email})
      const data = res;
      if(data === null){
        const hashPassword = await bcrypt.hash(request.body.password, 10)
        await User.create({
          userName: request.body.userName,
          email: request.body.email,
          password: hashPassword,
          userID: Math.ceil(Math.random()*Date.now()) + 
          lettersArr[Math.ceil(Math.random()*lettersArr.length)] + 
          Math.ceil(Math.random()*1000000) + 
          letterAr[Math.ceil(Math.random()*letterAr.length)].toString(),
          })
      
          console.log("User Created!");
          console.log(request.body); 
          request.flash('success_msg', 'You are now registered');
          response.redirect('/');
      }
      else{
        console.log("Email is already registered.");
      }
    }
    catch(err){
      console.log(`Unable to create account! ${err}`);
      response.redirect('/page/signup');
    }
},
postSignIn: (request, response, next) =>{
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/page/signin',
    failureFlash: true
  })(request, response, next);
}, 
getSignIn: async (request, response) =>{
  try{
    await response.render('login.ejs', {welcomeMsg: 'Conquer the world!'})
  }
  catch(err){
    console.log(err);
  }  
},
signOut: (request, response, next) =>{
  request.logout(function(err) {
    if (err) { return next(err); }
    console.log('Successfully logged out!');
    response.redirect('/page/signin');
  });
}
}


