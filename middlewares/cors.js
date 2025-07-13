const cors = require('cors');

const corsMiddleware = cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5173",
        "https://card-react-app-including-own-uploaded.onrender.com"
    ]
})

module.exports = corsMiddleware;
