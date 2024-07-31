const express = require('express');
const router = express.Router();

const {
    getDashboardData
} = require('../controllers/dashboard');

router.route('/:userId').get(getDashboardData);

module.exports = router;