const morganLogger = require("./morgan/morganLogger");
require("dotenv").config();

const LOGER = process.env.LOGER;

const loggerMiddleWare = () => {
    if (LOGER === "morgan") {
        return morganLogger;
    }
};

module.exports = loggerMiddleWare;