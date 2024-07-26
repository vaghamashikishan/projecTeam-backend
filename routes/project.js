const express = require('express');
const router = express.Router();

//funcs
const {
    getAllTechnologies,
    postAllTechnologies,
    addProject,
    getProject
} = require('../controllers/project');

router.route('/').get(getProject).post(addProject);
router.route('/technologies').get(getAllTechnologies).post(postAllTechnologies);

module.exports = router;