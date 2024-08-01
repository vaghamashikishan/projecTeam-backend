const jwt = require("jsonwebtoken");
const status_codes = require("http-status-codes");
const { createCustomError } = require("../errors/customError");

const authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(createCustomError("No token provided", status_codes.StatusCodes.UNAUTHORIZED));
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        next(createCustomError("Unauthorized user", status_codes.StatusCodes.UNAUTHORIZED));
    }
}

module.exports = authorizationMiddleware;