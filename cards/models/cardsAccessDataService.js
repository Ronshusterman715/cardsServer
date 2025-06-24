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
            throw new Error("Mongoose: " + error.message);
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
            throw new Error("Mongoose: " + error.message);
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
            throw new Error("Mongoose: " + error.message);
        }
    }
}

//get my cards
const getMyCard = async (userId) => {
    try {
        let myCards = await Card.find({ user_id: userId });
        return myCards;
    } catch (error) {
        throw new Error("Mongoose: " + error.message);
    }
}

//update cards
const updateCard = async (cardId, updatedCard) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, updatedCard, { new: true });
        return card;

    } catch (error) {
        throw new Error("Mongoose: " + error.message);
    }
}

//delete cards
const deleteCard = async (cardId) => {
    try {
        let card = await Card.findByIdAndDelete(cardId);
        return card;
    } catch (error) {
        throw new Error("Mongoose: " + error.message);
    }
}

//like cards
const likeCard = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId);
        if (!card) throw new Error("Card with id " + cardId + " cannot be found in the database");
        if (card.likes.includes(userId)) {
            let newLikesArray = card.likes.filter((id) => id !== userId);
            card.likes = newLikesArray;
        } else {
            card.likes.push(userId);
        }
        await card.save();
        return card;
    } catch (error) {
        throw new Error("Mongoose: " + error.message);
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