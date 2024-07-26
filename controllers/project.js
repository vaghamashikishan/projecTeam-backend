const status_codes = require('http-status-codes');
const Technology = require('../models/technology');
const Project = require('../models/project');

const getAllTechnologies = async (req, res) => {
    const technologies = await Technology.find({});
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

module.exports = {
    getAllTechnologies,
    postAllTechnologies,
    addProject,
    getProject
}