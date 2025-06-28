const mongoose = require('mongoose');
const chalk = require('chalk');

const connectToLocalDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/cardsServer")
        console.log(chalk.bold.white.bgRed('Connected to MongoDB locally successfully'));
    } catch (error) {
        console.error('Error connecting to MongoDB locally:', error);
    }
}

module.exports = connectToLocalDB;