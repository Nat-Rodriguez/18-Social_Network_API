const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ThoughtsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose.connection;