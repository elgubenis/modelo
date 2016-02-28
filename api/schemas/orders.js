var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var timestamps   = require('mongoose-timestamp');
autoIncrement    = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);


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
  articles: {},
  order_no: Number
});

order.plugin(timestamps);
order.plugin(autoIncrement.plugin, { model: 'orders', field: 'order_no' });

module.exports = mongoose.model('orders', order);