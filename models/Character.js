const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  charName: {
    type: String,
    required: true
  },
  charAge: {
    type: String,
    required: true
  },
  charFruit: {
    type: Object,
    required: false
  },
  charhaki: {
    type: Object,
    required: true
  },
  charRank: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    default: ""
  },
  id: {
    type: String,
    required: true
  },
  pirate: {
    type: Boolean,
    required: true
  },
  marine: {
    type: Boolean,
    required: true
  },
  description: {
    type: Array,
    required: true
  },
  superAdmin: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('characters', CharacterSchema);