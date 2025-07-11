const express = require("express");
const { createCard, getCardById, getAllCards, getMyCard, updateCard, deleteCard, likeCard } = require("../models/cardsAccessDataService");
const { auth } = require("../../auth/authService");
const normalizeCard = require("../helpers/normalizeCard");
const { handleError, createError } = require("../../utils/handleErrors");
const cardValidation = require("../validation/cardValidationService");
const Card = require("../models/mongodb/Card");

const router = express.Router();

// create new card
router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return createError("autorotation", "Only business users can create cards", 403);
        }

        const errorMessage = cardValidation(req.body);
        if (errorMessage !== "") {
            return createError("validation", errorMessage, 400);
        }

        let normalizedCard = await normalizeCard(req.body, userInfo._id);
        let card = await createCard(normalizedCard);
        res.status(201).send(card);
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});

// get all cards
router.get("/", async (req, res) => {
    try {
        let allCards = await getAllCards();
        res.status(200).send(allCards);
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});

// get my card 
router.get("/my-Cards", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return createError("autorotation", "Only business users can view their cards", 403);
        }
        const user_id = userInfo._id;
        let myCards = await getMyCard(user_id);
        res.status(200).send(myCards);
    } catch (error) {
        return handleError(res, error.status, error.message);
    }
});

//get card by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let card = await getCardById(id);
        res.status(200).send(card);
    } catch (error) {
        return handleError(res, 400, error.message);
    }
});

//update card
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        let userInfo = req.user;
        const originalCardFromDB = await getCardById(id);
        if (!userInfo.isAdmin && userInfo._id != originalCardFromDB.user_id) {
            return createError("autorotation", error.message, error.status)
        }

        const errorMessage = cardValidation(req.body);
        if (errorMessage !== "") {
            return createError("validation", errorMessage, 400);
        }

        if (req.body.bizNumber !== originalCardFromDB.bizNumber && !userInfo.isAdmin) {
            return createError("authorization", "Only admin user can change bizNumber")
        }

        if (userInfo.isAdmin && req.body.bizNumber && req.body.bizNumber !== originalCardFromDB.bizNumber) {
            const cardWithSameBizNumber = await Card.findOne({ bizNumber: req.body.bizNumber });

            if (cardWithSameBizNumber) {
                return createError("validation", "the new bizNumber is al\ready in use", 400)
            }
        }

        let normalizeUpdateCard = await normalizeCard(req.body, userInfo._id);
        let card = await updateCard(id, normalizeUpdateCard);
        res.status(201).send(card);
    } catch (error) {
        return handleError(res, 400, error.message);
    }
});

//delete card
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Trying to delete card with ID:", id); // Debug log
        let userInfo = req.user;

        let originalCardFromDB = await getCardById(id);
        console.log("Card found:", originalCardFromDB); // Debug log
        if (!userInfo.isAdmin && originalCardFromDB.user_id != userInfo._id) {
            return createError("autorotation", "only the owner of the card or an admin can delete cards", 403)
        }

        let card = await deleteCard(id);
        res.status(200).send(card);
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
});

//like card
router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const userId = userInfo._id;
        let card = await likeCard(id, userInfo._id);
        res.status(200).send(card);
    } catch (error) {
        return handleError(res, 400, error.message);
    }
})



module.exports = router;

