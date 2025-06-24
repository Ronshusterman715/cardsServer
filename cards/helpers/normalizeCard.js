const generateBizNumber = require("./generateBizNumber")

const normalizeCard = async (rawCard, userId) => {
    return {
        ...rawCard,
        image: {
            url: rawCard.image.url || "https://www.freeiconspng.com/uploads/no-image-icon-13.png",
            alt: rawCard.image.alt || `${rawCard.title} card image`
        },
        bizNumber: rawCard.bizNumber || await generateBizNumber(),
        user_id: rawCard.user_id || userId
    }
}
module.exports = normalizeCard;
