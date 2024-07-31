const mongoose = require("mongoose");

const collabSchema = mongoose.Schema({
    collabratorId: {
        type: String,
        required: true
    },
    projects: {
        type: [String]
    },
});

const Collab = mongoose.model('collab', collabSchema);

module.exports = Collab;