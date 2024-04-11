const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lifeofmatsu:Live2swim*0826@cluster0.wbu9lfp.mongodb.net/googlebooks?retryWrites=true&w=majority&appName=Cluster0');

module.exports = mongoose.connection;