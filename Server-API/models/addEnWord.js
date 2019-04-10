const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EnWord = new Schema({
    text: {
      type: String,
      required: false
    },
    translate: {
      type: String,
      required: false 
    },
    like:{
        type:Number
    },
    created_at: {
      type: Date,
      default: Date.now
     },
     updated_at :{
        type: Date,
        default: Date.now
     },
     
  });

  const correctWord = new Schema({
    text: {
      type: String,
      required: false
    },
    oldTranslate: {
      type: String,
      required: false 
    },
    newTranslate: {
      type: String,
      required: false 
    },
    created_at: {
      type: Date,
      default: Date.now
     },
     updated_at :{
        type: Date,
        default: Date.now
     },
     
  });

 const {word, correct} ="";
  
  module.exports = word =  mongoose.model('EnWord', EnWord);
  module.exports = correct =  mongoose.model('correctWord', correctWord);