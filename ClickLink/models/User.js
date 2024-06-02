const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  links: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link'
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
