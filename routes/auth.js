const express = require('express');
const router = express.Router();

//funcs
const { addNewUserToDB } = require('../controllers/auth');

router.route('/add-user').post(addNewUserToDB);

module.exports = router;