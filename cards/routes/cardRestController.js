const express = require("express");
const { createCard, getCardById, getAllCards, getMyCard, updateCard, deleteCard, likeCard } = require("../models/cardsAccessDataService");
const { auth } = require("../../auth/authService");
const normalizeCard = require("../helpers/normalizeCard");

const router = express.Router();

// create new card
router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return res.status(403).send("Only business users can create cards");
        }

        let normalizedCard = await normalizeCard(req.body, userInfo._id);

        let card = await createCard(normalizedCard);
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

// get all cards
router.get("/", async (req, res) => {
    try {
        let allCards = await getAllCards();
        res.status(200).send(allCards);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

// get my card 
router.get("/my-Cards", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return res.status(403).send("Only business users can view their cards");
        }
        const user_id = userInfo.id;
        let myCards = await getMyCard(user_id);
        res.status(200).send(myCards);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

//get card by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let card = await getCardById(id);
        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

//update card
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        let userInfo = req.user;
        let originalCardFromDB = await getCardById(id);
        if (!userInfo.isAdmin && userInfo._id != originalCardFromDB.user_id) {
            return res.status(403).send("only the owner of the card or an admin can update cards");
        }
        let normalizeUpdateCard = await normalizeCard(req.body, userInfo._id);

        let card = await updateCard(id, normalizeUpdateCard);
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

//delete card
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        let card = await deleteCard(id);
        let userInfo = req.user;

        let originalCardFromDB = await getCardById(id);
        if (!userInfo.isAdmin && userInfo._id != originalCardFromDB.user_id) {
            return res.status(403).send("only the owner of the card or an admin can delete cards");
        }

        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error.message)
    }
});

//like card
router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        let card = await likeCard(id, userId);
        res.status(200).send(card);
    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = router;

