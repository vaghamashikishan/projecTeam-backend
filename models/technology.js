const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const Technology = mongoose.model('technology', TechnologySchema);

module.exports = Technology;
