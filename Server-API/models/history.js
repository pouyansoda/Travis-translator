const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const History = new Schema({
    text: {
      type: String,
      required: false
    },
    translate: {
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

  
  module.exports = history =  mongoose.model('History', History);