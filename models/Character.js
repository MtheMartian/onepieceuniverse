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
    required: true
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
  } 
})

module.exports = mongoose.model('characters', CharacterSchema);