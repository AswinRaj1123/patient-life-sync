const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    // This will not actually be executed as per the requirement not to connect to the database yet
    console.log('MongoDB connection function is ready but not executed as requested');
    
    /* 
    // When you want to connect to MongoDB, uncomment this code:
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    */
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
