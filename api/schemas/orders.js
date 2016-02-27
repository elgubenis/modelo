var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var timestamps   = require('mongoose-timestamp');


var Schema = mongoose.Schema;
var order = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  total: {
    type: Number
  },
  articles: {}
});

order.plugin(timestamps);

module.exports = mongoose.model('orders', order);