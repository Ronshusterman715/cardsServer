const _ = require("lodash");
const Card = require("../models/mongodb/Card");
const { createError } = require("../../utils/handleErrors");

const generateBizNumber = async () => {
    let cardsCount = Card.countDocuments();
    if (cardsCount === 8_999_999) {
        return createError("mongoose",
            "Maximum number of cards reached in the app",
            409);
    }

    let random

    do {
        random = _.random(1_000_000, 8_999_999);
    } while (await isBizNumberExists(random));

    //there are a lot of ways to generate a random number, this is just one of them, you can use just number +1 or separate function to generate random number.

    return random;
}

const isBizNumberExists = async (bizNumber) => {
    try {
        const cardWithThisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardWithThisBizNumber);
    } catch (error) {
        return createError("mongoose", error.message, 500);
    }
}

module.exports = generateBizNumber;