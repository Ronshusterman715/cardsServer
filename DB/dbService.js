const { createError } = require("../utils/handleErrors");
const connectToAtlasDB = require("./mongoDB/connectToAtlas");
const connectToLocalDB = require("./mongoDB/connectToMongodbLocally");

const ENVIRONMENT = "development";

const connectToDB = async () => {
    if (ENVIRONMENT === "development") {
        await connectToLocalDB();
        return "Connected to development database";
    } else if (ENVIRONMENT === "production") {
        await connectToAtlasDB();
        return "Connected to production database";
    } else {
        return createError("environment", "Unknown environment", 500);
    }
}

module.exports = connectToDB;