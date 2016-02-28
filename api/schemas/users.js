var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var timestamps   = require('mongoose-timestamp');


var Schema = mongoose.Schema;
var user = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  location: { 
    type: [ Number ],
    index: '2d'
  },
  orders: [],
  awards: [{
    name: { 
      type: String
    },
    icon: { 
      type: String
    },
    hasAward: { 
      type: Boolean
    }
  }],
  events: [],
  mm:{
    type: Number,
    default: 0
  }
});

user.plugin(timestamps);

module.exports = mongoose.model('users', user);