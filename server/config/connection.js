// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lifeofmatsu:Live2swim*0826@cluster0.wbu9lfp.mongodb.net/googlebooks?retryWrites=true&w=majority&appName=Cluster0');

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));


  module.exports = mongoose.connection;