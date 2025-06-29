const loginValidation = require("./joi/loginValidation");
const registerValidation = require("./joi/registerValidation");

const validator = "Joi"

const validateRegistration = (user) => {
    if (validator === "Joi") {
        const { error } = registerValidation(user);
        if (error) return error.details.map((detail) => detail.message);
        return "";
    }
};

const validateLogin = (user) => {
    if (validator === "Joi") {
        const { error } = loginValidation(user);
        if (error) return error.details.map((detail) => detail.message);
        return "";
    }
}

module.exports = {
    validateRegistration,
    validateLogin
};
