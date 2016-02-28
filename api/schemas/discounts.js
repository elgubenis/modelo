var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var timestamps   = require('mongoose-timestamp');


var Schema = mongoose.Schema;

var discount = new Schema({
  shortId: {
    type: String
  },
  discount: {
    type: Number
  },
});

discount.plugin(timestamps);

module.exports = mongoose.model('discounts', discount);