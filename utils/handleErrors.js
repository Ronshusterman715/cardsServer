const createError = (validator, message, status) => {
    const error = new Error(`${validator} Error: ${message}`);
    error.status = status || 400;
    console.log(error.message + ` - Status: ${error.status}`);
    throw error;
}

const handleError = (res, status, message = "") => {
    console.log(message);
    return res.status(status).send(message);
};

module.exports = {
    createError,
    handleError
};