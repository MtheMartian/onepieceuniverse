const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  likes: {
    type: Object,
    default: {numberOfLikes: 0, whoLiked:[]},
  },
  replies: {
    type: Array,
    default: [],
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