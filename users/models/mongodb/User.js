const mongoose = require('mongoose');
const Name = require('../../../helpers/mongodb/Name');
const { PHONE_VALIDATION, EMAIL_VALIDATION } = require('../../../helpers/mongodb/mongooseValidator');
const Image = require('../../../helpers/mongodb/Images');
const Address = require('../../../helpers/mongodb/Address');

const userSchema = new mongoose.Schema({
    name: Name,
    phone: PHONE_VALIDATION,
    email: EMAIL_VALIDATION,
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
    },
    image: Image,
    address: Address,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBusiness: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    loginAttempts: {
        type: Number,
        default: 0,
    },
    lockUntil: {
        Date
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;