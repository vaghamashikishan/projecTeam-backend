const express = require('express');
const router = express.Router();

//funcs
const {
    getAllTechnologies,
    postAllTechnologies,
    addProject,
    getProject,
    getProjectByID,
    addKanban,
    getKanbanByProjectID,
    updateLikes
} = require('../controllers/project');

router.route('/').get(getProject).post(addProject);
router.route('/id/:id').get(getProjectByID);
router.route('/technologies').get(getAllTechnologies).post(postAllTechnologies);
router.route('/kanban').post(addKanban);
router.route('/kanban/:projectId').get(getKanbanByProjectID);
router.route('/likes').post(updateLikes);


module.exports = router;