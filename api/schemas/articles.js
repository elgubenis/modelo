var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var timestamps   = require('mongoose-timestamp');


var Schema = mongoose.Schema;

var article = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  stars: {
    type: Number
  },
  quantity: {
    type: Number
  },
  image: {
    type: String
  }
});

article.plugin(timestamps);

module.exports = mongoose.model('articles', article);