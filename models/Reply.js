const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  userID: {
    type: String,
    require: true,
  },
  userProfilePic: {
    type: String,
    require: true,
  },
  likes: {
    type: Object,
    default: {numberOfLikes: 0, whoLiked: []},
  },
  commentID: {
    type: String,
    require: true,
  },
  cardID: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('replies', ReplySchema);