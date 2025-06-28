const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePassword } = require("../helpers/bcrypt");
const User = require("./mongodb/User");


//register new user
const registerUser = async (newUser) => {
    try {
        newUser.password = generateUserPassword(newUser.password);
        let user = new User(newUser);
        user = await user.save();
        return user;
    } catch (error) {
        return createError("mongoose", error.message);
    }
};

//get user
const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        return createError("mongoose", error.message);
    }
};

// get all users
const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        return createError("mongoose", error.message);
    }
};

// login user
const loginUser = async (email, password) => {
    try {
        const userFromDB = await User.findOne({ email });
        if (!userFromDB) {
            return createError("authentication", "User not exist");
        }
        if (!comparePassword(password, userFromDB.password)) {
            return createError("authentication", "Invalid email or password");
        }

        const token = generateAuthToken(userFromDB);
        return token;
    } catch (error) {
        return createError("authentication", error.message);
    }
}

module.exports = {
    registerUser,
    getUser,
    getAllUsers,
    loginUser,
};
