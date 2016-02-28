var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var timestamps   = require('mongoose-timestamp');


var Schema = mongoose.Schema;
var user = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  lat: { type: Number },
  long: { type: Number },
  orders: [],
  liters: {
    type: Number
  }
});

user.plugin(timestamps);

module.exports = mongoose.model('users', user);