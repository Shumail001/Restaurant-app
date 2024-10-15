const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            success: false,
            message: "Authorization token not provided or improperly formatted",
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not provided",
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        let message = "Token verification failed";
        if (err.name === "TokenExpiredError") {
            message = "Token expired";
        } else if (err.name === "JsonWebTokenError") {
            message = "Token is invalid";
        }

        return res.status(401).json({
            success: false,
            message,
        });
    }
};

module.exports = authMiddleware;
