const status_codes = require('http-status-codes');
const { customError } = require('../errors/customError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof customError) {
        return res.status(err.statusCode).send({ err: err.message });
    }

    if (err._message) {
        errorMsg = err._message;
    } else if (err.errorResponse && err.errorResponse.errmsg) {
        errorMsg = err.errorResponse.errmsg;
    } else if (err.message) {
        errorMsg = err.message;
    } else if (err.ValidatorError) {
        errorMsg = err.ValidatorError;
    }
    console.log(err);
    return res.status(status_codes.StatusCodes.INTERNAL_SERVER_ERROR).send({ err: errorMsg });
}

module.exports = errorHandler;