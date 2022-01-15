const mongoose = require('mongoose');
const dotenv = require('dotenv');

require("dotenv").config({
    path: "./config/.env"
});
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

}
module.exports = connectDB;