const status_codes = require('http-status-codes');
const Technology = require('../models/technology');
const Project = require('../models/project');
const Kanban = require('../models/kanban');

const getAllTechnologies = async (req, res) => {
    const technologies = await Technology.find();
    res.status(status_codes.StatusCodes.OK).json(technologies);
}

const postAllTechnologies = async (req, res) => {
    const technologies = req.body;
    const result = await Technology.insertMany(technologies);
    res.status(status_codes.StatusCodes.OK).json({ msg: "Added successfully", data: result });
}

const addProject = async (req, res) => {
    const projectData = req.body;
    const result = await Project.create(projectData);
    res.status(status_codes.StatusCodes.OK).json({ msg: "Project created successfully." });
}

const getProject = async (req, res) => {
    const result = await Project.find({});
    res.status(status_codes.StatusCodes.OK).json(result);
}

const getProjectByID = async (req, res) => {
    const projectID = req.params.id;
    const result = await Project.findById(projectID);
    res.status(status_codes.StatusCodes.OK).json(result);
}

const getKanbanByProjectID = async (req, res) => {
    const projectId = req.params.projectId;
    const result = await Kanban.findOne({ projectId: projectId });
    if (result === null)
        res.status(status_codes.StatusCodes.OK).json(null);
    else
        res.status(status_codes.StatusCodes.OK).json(result);
}

const addKanban = async (req, res) => {
    const kanbanId = req.body._id;
    const kanbanData = req.body;

    let result;
    if (kanbanId === undefined || kanbanId === null) {
        result = await Kanban.create(kanbanData);
    } else {
        result = await Kanban.updateOne({ _id: kanbanId }, kanbanData);
    }
    res.status(status_codes.StatusCodes.OK).json({ msg: "Added successfully" });
}

const updateLikes = async (req, res) => {
    const projectID = req.body.projectId;
    const likes = req.body.likes;
    const result = await Project.updateOne({ _id: projectID }, { $set: { likes: likes } });
    res.status(status_codes.StatusCodes.OK).json({ msg: "Updated your like" });
}

module.exports = {
    getAllTechnologies,
    postAllTechnologies,
    addProject,
    getProject,
    getProjectByID,
    getKanbanByProjectID,
    addKanban,
    updateLikes
}