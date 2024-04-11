const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// mongoose.connect(
//     "mongodb+srv://lifeofmatsu:Live2swim*0826@cluster0.wbu9lfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   );

//   const connectDB = async () => {
//     try {
//       await mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log('MongoDB Connected...');
//     } catch (err) {
//       console.error(err.message);
//       // Exit process with failure
//       process.exit(1);
//     }
//   };
  
//   module.exports = connectDB;

module.exports = mongoose.connection;