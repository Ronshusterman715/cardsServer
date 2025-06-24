const mongoose = require('mongoose');

const connectionStringForAtlas = ""; // Replace with your actual MongoDB Atlas connection string

const connectToAtlasDB = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log('Connected to MongoDB Atlas successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
};

module.exports = connectToAtlasDB;
