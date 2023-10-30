const mongoose = require("mongoose");

const schoolSchema=mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    required:true
  }
});

const schoolModel=mongoose.model('school',schoolSchema)
module.exports=schoolModel