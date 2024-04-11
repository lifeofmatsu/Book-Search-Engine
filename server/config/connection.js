const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

mongoose.connect(
    "mongodb+srv://lifeofmatsu:Live2swim*0826@cluster0.wbu9lfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

module.exports = mongoose.connection;