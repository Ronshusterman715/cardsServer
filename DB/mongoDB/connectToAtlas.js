const mongoose = require('mongoose');
require("dotenv").config();

const connectionStringForAtlas = process.env.MONGO_ATLAS_URI;

const connectToAtlasDB = async () => {
    try {
        await mongoose.connect(connectionStringForAtlas);
        console.log('Connected to MongoDB Atlas successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
};

module.exports = connectToAtlasDB;
