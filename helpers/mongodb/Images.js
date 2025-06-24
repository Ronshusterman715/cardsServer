const mongoose = require('mongoose');
const { URL_VALIDATION, DEFAULT_VALIDATION } = require('./mongooseValidator');

const Image = new mongoose.Schema({
    url: URL_VALIDATION,
    alt: { ...DEFAULT_VALIDATION, required: false, minlength: 0 },
});

module.exports = Image;