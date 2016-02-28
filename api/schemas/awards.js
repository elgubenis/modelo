var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var timestamps   = require('mongoose-timestamp');


var Schema = mongoose.Schema;

var award = new Schema({
  name: {
    type: String
  },
  icon: {
    type: String
  },
  hasAward: {
    type: Boolean
  }
});

award.plugin(timestamps);

module.exports = mongoose.model('awards', award);
