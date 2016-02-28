var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var timestamps   = require('mongoose-timestamp');


var Schema = mongoose.Schema;

var event = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
});

event.plugin(timestamps);

module.exports = mongoose.model('events', event);