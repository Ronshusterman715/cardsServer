const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");

const DB = "MONGODB";

//create card
const createCard = async (newCard) => {
    if (DB === "MONGODB") {
        try {
            let card = new Card(newCard);
            card = await card.save();
            return card;
        } catch (error) {
            return createError("mongoose", error.message, error.status);
        }
    }
};
//         if (DB === "mySQL") {
//             try {
// Implement MySQL card creation logic here
//             } catch (error) {

//             }
//         }
//     }
// }

//get all cards
const getAllCards = async () => {
    if (DB === "MONGODB") {
        try {
            let cards = await Card.find();
            return cards;
        } catch (error) {
            return createError("mongoose", error.message, 500);
        }
    }
}

//get card by id
const getCardById = async (cardId) => {
    if (DB === "MONGODB") {
        try {
            let card = await Card.findById(cardId);
            return card;
        } catch (error) {
            return createError("mongoose", error.message, 400);
        }
    }
}

//get my cards
const getMyCard = async (userId) => {
    try {
        let myCards = await Card.find({ user_id: userId });
        return myCards;
    } catch (error) {
        return createError("mongoose", error.message);
    }
}

//update cards
const updateCard = async (cardId, updatedCard) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, updatedCard, { new: true });
        return card;

    } catch (error) {
        return createError("mongoose", error.message);
    }
}

//delete cards
const deleteCard = async (cardId) => {
    try {
        let card = await Card.findByIdAndDelete(cardId);
        return card;
    } catch (error) {
        return createError("mongoose", error.message);
    }
}

//like cards
const likeCard = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId);
        if (!card) {
            return createError("mongoose", "Card with id " + cardId + " cannot be found in the database");
        }
        if (card.likes.includes(userId)) {
            let newLikesArray = card.likes.filter((id) => id !== userId);
            card.likes = newLikesArray;
        } else {
            card.likes.push(userId);
        }
        await card.save();
        return card;
    } catch (error) {
        return createError("mongoose", error.message);
    }
}


module.exports = {
    createCard,
    getAllCards,
    getCardById,
    getMyCard,
    updateCard,
    deleteCard,
    likeCard
};