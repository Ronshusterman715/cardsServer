const { createError } = require("../utils/handleErrors");
const connectToAtlasDB = require("./mongoDB/connectToAtlas");
const connectToLocalDB = require("./mongoDB/connectToMongodbLocally");

const ENVIROMENT = "development";

const connectToDB = async () => {
    if (ENVIROMENT === "development") {
        await connectToLocalDB();
        return "Connected to development database";
    } else if (ENVIROMENT === "production") {
        await connectToAtlasDB();
        return "Connected to production database";
    } else {
        return createError("environment", "Unknown environment", 500);
    }
}

module.exports = connectToDB;