const status_codes = require('http-status-codes');
const { createCustomError } = require('../errors/customError');
const jwt = require("jsonwebtoken");

const userModal = require('../models/user');

const addNewUserToDB = async (req, res, next) => {
    const data = req.body;
    if (!data.supabaseId || !data.name || !data.email) {
        next(createCustomError("All information is not provided", status_codes.StatusCodes.BAD_REQUEST));
    }
    const id = data.supabaseId;
    const username = data.name;
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' });

    // checking if user is already stored then we will not store again
    const user = await userModal.findOne({ supabaseId: data.supabaseId });
    if (!user) {
        const result = await userModal.create(data);
        res.status(status_codes.StatusCodes.CREATED).json({ result: result, token: token });
    } else {
        res.status(status_codes.StatusCodes.OK).json({ msg: "User already exist", token: token });
    }
}

module.exports = {
    addNewUserToDB
}