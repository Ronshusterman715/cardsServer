const mongoose = require('mongoose');
const { DEFAULT_VALIDATION, PHONE_VALIDATION, EMAIL_VALIDATION, URL_VALIDATION } = require('../../../helpers/mongodb/mongooseValidator');
const Image = require('../../../helpers/mongodb/Images');
const Address = require('../../../helpers/mongodb/Address');
const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
    phone: PHONE_VALIDATION,
    email: EMAIL_VALIDATION,
    web: URL_VALIDATION,
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000,
        max: 9999999,
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;


