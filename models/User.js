const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName:{
    Type: String
  },
  userPassword:{
    Type: String
  },
  userID:{
    Type: String
  }
})

module.exports = mongoose.model('users', UserSchema);