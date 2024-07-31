const status_codes = require('http-status-codes');
const Technology = require('../models/technology');
const Project = require('../models/project');
const Kanban = require('../models/kanban');
const CollabRequest = require('../models/collab-request');
const Collab = require('../models/collab');

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

const addCollabRequest = async (req, res) => {
    const collabData = req.body;

    let msg = "";
    const existData = await CollabRequest.find({ projectId: collabData.projectId, requestUserId: collabData.requestUserId });
    if (existData.length > 0) {
        msg = "Request has already been sent."
    } else {
        const result = await CollabRequest.create(collabData);
        msg = "Request sended successfully.";
    }
    res.status(status_codes.StatusCodes.OK).json({ msg: msg });
}

const getCollabRequestsForUser = async (req, res) => {
    const userId = req.params.userId;
    const allCollabData = await CollabRequest.find({ ownerId: userId });
    res.status(status_codes.StatusCodes.OK).json({ data: allCollabData });
}

const handleCollabRequestsForUser = async (req, res) => {
    const { collabId, isAccepted } = req.body;

    if (isAccepted === "true") {
        const collabData = await CollabRequest.findById(collabId);
        const { projectId, requestUserId, requestUserName } = collabData;
        const project = await Project.findById(projectId);
        const allUserCollabration = await Collab.find({ collabratorId: requestUserId });
        const userExists = project.collaborators.some(
            collaborator => collaborator[0] === requestUserId
        );

        if (!userExists) {
            project.collaborators.push([requestUserId, requestUserName]);
            await project.save();

            if (allUserCollabration.length == 0) {
                const data = {
                    collabratorId: requestUserId,
                    projects: [projectId]
                }
                await Collab.create(data);
            } else {
                allUserCollabration[0].projects.push(projectId);
                await allUserCollabration[0].save()
            }
        }
    }

    const result = await CollabRequest.findByIdAndDelete(collabId);
    let msg = "Collabrator request rejected successfully.";
    if (isAccepted === 'true')
        msg = "Collabrator request accepted successfully.";
    res.status(status_codes.StatusCodes.OK).json({ msg: msg });
}

module.exports = {
    getAllTechnologies,
    postAllTechnologies,
    addProject,
    getProject,
    getProjectByID,
    getKanbanByProjectID,
    addKanban,
    updateLikes,
    addCollabRequest,
    getCollabRequestsForUser,
    handleCollabRequestsForUser
}