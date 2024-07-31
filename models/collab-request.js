const mongoose = require('mongoose');

const collabRequestSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    requestUserId: {
        type: String,
        required: true
    },
    requestUserName: {
        type: String,
        required: true
    },
    msg: {
        type: String
    }
}, { timestamps: true });

const CollabRequest = mongoose.model('collab-request', collabRequestSchema);

module.exports = CollabRequest;