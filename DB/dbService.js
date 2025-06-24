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
        throw new Error("Unknown environment");
    }
}

module.exports = connectToDB;