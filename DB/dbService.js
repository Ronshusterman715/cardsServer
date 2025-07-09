const connectToLocalDB = require("./mongoDB/connectToMongodbLocally");
const connectToAtlasDB = require("./mongoDB/connectToAtlas");

require("dotenv").config();

const ENVIRONMENT = process.env.ENVIRONMENT;
const DB = process.env.DB;

const connectToDB = async () => {
    if (DB === "MONGODB") {
        if (ENVIRONMENT === "development") {
            await connectToLocalDB();
        }
        if (ENVIRONMENT === "production") {
            await connectToAtlasDB();
        }
    }

    if (DB === "sql") {
    }
};

module.exports = connectToDB;