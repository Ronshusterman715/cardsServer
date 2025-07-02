const mongoose = require('mongoose');
const chalk = require('chalk');
require("dotenv").config();

const localMongoAddress = process.env.MONGO_LOCAL_URI;

const connectToLocalDB = async () => {
    try {
        await mongoose.connect(localMongoAddress)
        console.log(chalk.bold.white.bgRed('Connected to MongoDB locally successfully'));
    } catch (error) {
        console.error('Error connecting to MongoDB locally:', error);
    }
}

module.exports = connectToLocalDB;