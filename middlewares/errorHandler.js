const status_codes = require('http-status-codes');
const { customError } = require('../errors/customError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof customError) {
        return res.status(err.statusCode).send({ err: err.message });
    }
    return res.status(status_codes.StatusCodes.INTERNAL_SERVER_ERROR).send({ err: "Something went wrong..." });
}

module.exports = errorHandler;