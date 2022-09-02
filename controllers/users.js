const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');
const { db } = require('../models/User');

module.exports = {
  getSignUp: (req, res) =>{
    if(req.user){
      res.redirect('/');
    }
      res.render('signup');
  },
  postSignUp: (response, request, next) =>{
    const validationErrors = []
    if (!validator.isEmail(request.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(request.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (request.body.password !== request.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
      request.flash('errors', validationErrors)
      return response.redirect('/page/signup')
    }
    request.body.email = validator.normalizeEmail(request.body.email, { gmail_remove_dots: false })

    //Generate random letters for ID
      const lettersArr = ['ab', 'bc', 'cd', 'de', 'ef', 'fg', 'gh',
      'hi', 'ij', 'jk', 'kl', 'lm', 'mn', 'no',
      'op', 'pq', 'qr', 'rs', 'tu', 'uv', 'vw',
      'wx', 'xy', 'yz'];
    //-------------------------------
    const user = new User({
    userName: request.body.userName,
    email: request.body.email,
    password: request.body.password,
    userID: Math.ceil(Math.random()*Date.now()) + 
    lettersArr[Math.ceil(Math.random()*lettersArr.length)] + 
    Math.ceil(Math.random()*100).toString(),
    })

    User.findOne({$or: [
      {email: request.body.email},
      {userName: request.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('/page/signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        request.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          response.redirect('/')
        })
      })
    })
  },
  getSignIn: (req, res) => {
    if (req.user) {
      return res.redirect('/');
    }
    res.redirect('/');
  },
  postSignIn: (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info);
        return res.redirect('/page/signup');
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' });
        res.redirect(req.session.returnTo || '/');
      })
    })(req, res, next)
  },
  signOut: (req, res) => {
    if (req.user) {
      return res.redirect('/')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
}


//Check username and password
// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
//     if (err) { return cb(err); }
//     if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, row);
//     });
//   });
// }));

//Persist the users info
// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });
