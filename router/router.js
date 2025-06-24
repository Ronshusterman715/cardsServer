const express = require("express");
const cardRouter = require("../cards/routes/cardRestController");
const userRouter = require("../users/routes/userRestController")

const router = express.Router();

router.use("/cards", cardRouter);
router.use("/users", userRouter);

router.use((req, res) => {
    res.status(404).send("Path Not Found");
});

module.exports = router;


