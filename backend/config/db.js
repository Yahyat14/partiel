const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coffeearts';
    
    // Mongoose v9 n'accepte plus useNewUrlParser / useUnifiedTopology
    const conn = await mongoose.connect(mongoURI);


    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
