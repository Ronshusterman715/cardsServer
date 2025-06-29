const morganLogger = require("./morgan/morganLogger");

const logger = "morgan";

const loggerMiddleWare = () => {
    if (logger === "morgan") {
        return morganLogger;
    }
};

module.exports = loggerMiddleWare;