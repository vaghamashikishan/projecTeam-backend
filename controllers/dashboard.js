const status_codes = require('http-status-codes');
const Project = require("../models/project");
const Collab = require('../models/collab');

const getDashboardData = async (req, res) => {
    const userId = req.params.userId;
    const allProjectCreatedByuser = await Project.find({ ownerId: userId });

    const allCollabedProjectIDs = await Collab.findOne({ collabratorId: userId });
    const allCollabedProjects = await Project.find({ _id: { $in: allCollabedProjectIDs.projects } });
    res.status(status_codes.StatusCodes.OK).json([allProjectCreatedByuser, allCollabedProjects]);
}

module.exports = {
    getDashboardData
}