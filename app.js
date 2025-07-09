const express = require('express');
const connectToDB = require('./DB/dbService');
const router = require('./router/router');
const corsMiddleware = require('./middlewares/cors');
const { handleError } = require('./utils/handleErrors');
const chalk = require('chalk');
const morgan = require('morgan');
const loggerMiddleWare = require('./logger/loggerService');



const app = express();
const PORT = 8181;

app.use(express.json());
app.use(express.static("./public"))

app.use(loggerMiddleWare());

app.use(corsMiddleware);

app.use(router);

app.use((err, req, res, next) => {
    console.log(err);
    return handleError(res, 500, "Internal Server Error");
});

app.listen(process.env.PORT || PORT, () => {
    console.log(chalk.green.bold.bgYellow("app is listening to port " + PORT));
    connectToDB();
});

