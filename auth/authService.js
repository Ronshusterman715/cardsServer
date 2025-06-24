const { verifyToken } = require("./providers/jwt");

const TOKEN_GENERATOR = "jwt";

const auth = (req, res, next) => {
    if (TOKEN_GENERATOR === "jwt") {
        try {
            const tokenFromClient = req.header("x-auth-token");
            if (!tokenFromClient) {
                throw new Error("Authentication Error: Please Login");
            }

            const userInfo = verifyToken(tokenFromClient);

            if (!userInfo) {
                throw new Error("Authentication Error: Unauthorized User");
            }

            req.user = userInfo;
            return next();
        } catch (error) {
            res.status(401).send(error.massage);
            return;
        }
    }
    return res.status(500).send("Server Authentication method not found");
};

module.exports = {
    auth
};  
