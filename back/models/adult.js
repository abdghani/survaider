var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var adultSchema = new Schema({
  "age": {
    type: String,
    required: true
  },
  "workclass": {
    type: String,
    required: true
  },
  "fnlwgt": {
    type: String,
    required: true
  },
  "education": {
    type: String,
    required: true
  },
  "education-num": {
    type: String,
    required: true
  },
  "marital-status": {
    type: String,
    required: true
  },
  "occupation": {
    type: String,
    required: true
  },
  "relationship": {
    type: String,
    required: true
  },
  "race": {
    type: String,
    required: true
  },
  "sex": {
    type: String,
    required: true
  },
  "capital-gain": {
    type: String,
    required: true
  },
  "capital-loss": {
    type: String,
    required: true
  },
  "hours-per-week": {
    type: String,
    required: true
  },
  "native-country": {
    type: String,
    required: true
  },
  "incom": {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('adult', adultSchema)
