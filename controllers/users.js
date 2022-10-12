const passport = require('passport');
const User = require('../models/User');
const Character = require('../models/Character');
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
    const {userName, email, password, confirmPassword} = request.body; //Descontructor
    let errors = [];

    //Check required fields
    if(!userName || !email || !password || !confirmPassword){
      errors.push({msg: 'Please fill in all fields.'});
    }

    //Check passwords match
    if(password !== confirmPassword){
      errors.push({msg: 'Passwords do not match.'});
    }

    //Check password length
    if(password.length < 8){
      errors.push({msg: 'Password should be at least 8 characters.'});
    }

    if(errors.length > 0){
      response.render('signup.ejs', {
        errors,
        userName,
        email,
        password,
        confirmPassword,
      });
    }
    else{
      try{
        const res = await User.findOne({email: request.body.email})
        const data = res;
        if(data === null){
          const hashPassword = await bcrypt.hash(password, 10)
          await User.create({
            userName: userName,
            email: email,
            password: hashPassword,
            userID: Math.ceil(Math.random()*Date.now()) + 
            lettersArr[Math.ceil(Math.random()*lettersArr.length)] + 
            Math.ceil(Math.random()*1000000) + 
            letterAr[Math.ceil(Math.random()*letterAr.length)].toString(),
            profilePicture: "/images/luffy.jpg",
            })
        
            console.log("User Created!");
            console.log(request.body); 
            request.flash('success_msg', 'You are now registered.');
            response.redirect('/page/signin');
        }
        else{
          errors.push({msg: "Email is already registered."});
          response.render('signup.ejs', {
            errors,
            userName,
            email,
            password,
            confirmPassword,
          });
        }
      }
      catch(err){
        console.log(`Unable to create account! ${err}`);
        response.redirect('/page/signup');
      }
    }
},
postSignIn: async (request, response, next) =>{
  // console.log(request);
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/page/signin',
    failureFlash: true
  })(request, response, next);
}, 
getSignIn: async (request, response) =>{
  const user = request.user;
  if(typeof user === 'undefined'){
    try{
      await response.render('login.ejs', {user: user});
    }
    catch(err){
      console.log(err);
    }  
  }
  else{
    response.redirect('/home');
  }
},
signOut: (request, response, next) =>{
  request.logout(function(err) {
    if (err) { return next(err); }
    request.flash('success_msg', 'Successfully logged out!');
    response.redirect('/');
  });
},
getUsers: async (request, response) =>{
  try{
    const users = await User.find();
    response.send(users);
  }
  catch(err){
    console.log(err);
  }
}
}


