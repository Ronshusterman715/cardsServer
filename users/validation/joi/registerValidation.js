const Joi = require('joi');
const Address = require('../../../helpers/mongodb/Address');

const registerValidation = (user) => {
    const schema = Joi.object({
        name: Joi.object().keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
        }).required(),
        phone: Joi.string().ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/).rule({ message: "Invalid israel phone number" }).required(),
        email: Joi.string().ruleset.regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).rule({ message: "Invalid email" }).required(),
        password: Joi.string().ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/).rule({ message: "password must contain at least one upper case letter, lower case letter, number and one special character. the minimum length is 7 and the maximum length is 20" }).required(),
        image: Joi.object({
            url: Joi.string().ruleset.regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/).rule({ message: "Image must contain a valid url" }).allow(""),
            alt: Joi.string().max(256).allow(""),
        }).required(),
        address: Joi.object().keys({
            state: Joi.string().allow(""),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number()
        }).required(),
        isBusiness: Joi.boolean().required(),
        isAdmin: Joi.boolean().allow(""),
    });
    return schema.validate(user);
};

module.exports = registerValidation;