const { generateAuthToken } = require("../../auth/providers/jwt");
const User = require("./mongodb/User");


//register new user
const registerUser = async (newUser) => {
    try {
        let user = new User(newUser);
        user = await user.save();
        return user;
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};

//get user
const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Error getting user: ' + error.message);
    }
};

// get all users
const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error('Error getting all users: ' + error.message);
    }
};

// login user
const loginUser = async (email, password) => {
    try {
        const userFromDB = await User.findOne({ email });
        if (!userFromDB) {
            throw new Error('Authentication Error: User not exist');
        }
        if (userFromDB.password !== password) {
            throw new Error('Authentication Error: invalid email or password');
        }
        const token = generateAuthToken(userFromDB);
        return token;
    } catch (error) {
        throw new Error('Error logging in user: ' + error.message);
    }
}

module.exports = {
    registerUser,
    getUser,
    getAllUsers,
    loginUser,
};
