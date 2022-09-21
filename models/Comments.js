const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  replies: {
    type: Array,
    default: [{comment: "", userID: "", 
                userProfilePicture: "", cardID: "", 
                likes: 0, dateCreated: new Date().toString}],
  },
  userID: {
    type: String,
    require: true,
  },
  userProfilePicture: {
    type: String,
    require: true,
  },
  cardID: {
    type: String,
    require: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('comments', CommentSchema);