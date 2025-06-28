const express = require('express');
const connectToDB = require('./DB/dbService');
const router = require('./router/router');
const corsMiddleware = require('./middlewares/cors');
const { handleError } = require('./utils/handleErrors');
const chalk = require('chalk');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("./public"))

app.use((req, res, next) => {
    console.log(chalk.yellow(`Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`));
    next();
});

app.use(corsMiddleware);

app.use(router);

app.use((err, req, res, next) => {
    console.log(err);
    return handleError(res, 500, "Internal Server Error");
});

app.listen(port, () => {
    console.log(chalk.green.bold.bgYellow('Server is running on port ' + port));
    connectToDB()
})

// PATCH http://localhost:3000/cards/6850121f9c276dee26f53ced
// Content-Type: application/json

// {
//      "userId": "7777a08b8f8a8a0015b0dcba"
//  }