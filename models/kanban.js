const mongoose = require('mongoose');

const kanbanSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    newIssues: {
        type: [String],
        required: true
    },
    productBacklog: {
        type: [String],
        required: true
    },
    inProgress: {
        type: [String],
        required: true
    },
    done: {
        type: [String],
        required: true
    }
});

const Kanban = mongoose.model('kanban', kanbanSchema);

module.exports = Kanban;