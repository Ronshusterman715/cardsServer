const DEFAULT_VALIDATION = {
    type: 'string',
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
};

const PHONE_VALIDATION = {
    type: 'string',
    required: true,
    match: RegExp(/^(?:\+972|0)(5\d|([2-4]|[7-9]))-?\d{7}$/),
};

const EMAIL_VALIDATION = {
    type: 'string',
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
};

const URL_VALIDATION = {
    type: 'string',
    lowercase: true,
    trim: true,
    match: RegExp(
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/
    ),
};

module.exports = {
    DEFAULT_VALIDATION,
    PHONE_VALIDATION,
    EMAIL_VALIDATION,
    URL_VALIDATION,
};