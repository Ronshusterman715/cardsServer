const mongoose = require('mongoose');

const connectToLocalDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/cardsServer")
        console.log('Connected to MongoDB locally successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB locally:', error);
    }
}

module.exports = connectToLocalDB;