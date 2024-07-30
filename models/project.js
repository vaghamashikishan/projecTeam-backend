const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [],
        required: true
    },
    collabSkills: {
        type: [String]
    },
    likes: {
        type: Number,
        default: 0
    },
    collaborators: {
        type: [[String]]
    }
}, { timestamps: true });

const Project = mongoose.model('project', projectSchema);

module.exports = Project;