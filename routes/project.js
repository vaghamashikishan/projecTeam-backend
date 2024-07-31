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
    updateLikes,
    addCollabRequest,
    getCollabRequestsForUser,
    handleCollabRequestsForUser
} = require('../controllers/project');

router.route('/').get(getProject).post(addProject);
router.route('/id/:id').get(getProjectByID);
router.route('/technologies').get(getAllTechnologies).post(postAllTechnologies);
router.route('/kanban').post(addKanban);
router.route('/kanban/:projectId').get(getKanbanByProjectID);
router.route('/likes').post(updateLikes);
router.route('/collab-request').post(addCollabRequest);
router.route('/collab-request/:userId').get(getCollabRequestsForUser);
router.route('/handle-collab-request').post(handleCollabRequestsForUser);

module.exports = router;