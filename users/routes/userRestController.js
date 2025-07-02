const express = require('express');
const { registerUser, getUser, getAllUsers, loginUser, updateUser, changeBusinessStatus } = require('../models/usersAccessDataService');
const { auth } = require('../../auth/authService');
const { handleError, createError } = require('../../utils/handleErrors');
const returnUser = require('../helpers/returnUser');
const { validateRegistration, validateLogin } = require('../validation/userValidationService');
const router = express.Router();

//create new user
router.post('/', async (req, res) => {
    try {
        let newUser = req.body;

        const errorMassage = validateRegistration(newUser);
        if (errorMassage !== "") {
            return createError("validation", errorMassage, 400);
        }



        let user = await registerUser(newUser);
        res.status(201).json(returnUser(user));
    } catch (error) {
        return handleError(res, 400, error.message);
    }
});

//get user by id
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        let userInfo = req.user;
        if (!userInfo.isAdmin && userInfo._id != user._id) {
            return createError("autorotation", "only the user himself or an admin can view this user info", 403);
        }

        let user = await getUser(id);
        res.status(200).json(user);
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});

// get all users
router.get('/', auth, async (req, res) => {
    let userInfo = req.user;

    try {
        if (!userInfo.isAdmin) {
            return createError("autorotation", "Only admin user can view all users", 403);
        }
        let users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});

//loin user
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        const errorMassage = validateLogin(req.body);
        if (errorMassage !== "") {
            return createError("validation", errorMassage, 400);
        }

        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        return handleError(res, 400, error.message);
    }
});

//update user
router.put('/:id', auth, async (req, res) => {
    let userInfo = req.user;
    let updatedUser = req.body;
    const { id } = req.params;
    try {
        if (userInfo._id !== id) {
            throw createError("autorotation", "Only the own user can update his detail", 403)
        }

        const errorMassage = validateRegistration(updatedUser);

        if (errorMassage !== "") {
            return createError("validation", errorMassage, 400);
        }
        let user = await updateUser(id, updatedUser);
        res.status(201).json(returnUser(user));
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});


//change isbuisness status
router.patch("/:id", auth, async (req, res) => {
    const { id } = req.params;
    let userInfo = req.user;
    try {
        if (userInfo._id !== id) {
            throw createError("autorotation", "Only the own user can update his detail", 403)
        };
        let user = await changeBusinessStatus(id);
        res.status(201).json(returnUser(user));
    } catch (error) {
        return handleError(res, 400, error.message);
    }
});

//delete user
router.delete("/:id", auth, async (req, res) => {
    const { id } = req.params;
    let userInfo = req.user;
    try {
        if (!userInfo.isAdmin && userInfo._id !== id) {
            throw createError("autorotation", "Only the own user or an admin can delete user account", 403)
        }

        let user = await deleteUser(id);
        res.status(201).json(returnUser(user));
    } catch (error) {
        return handleError(res, 400, error.message);
    }
})

module.exports = router;

