const mongoose = require('mongoose');

// Padrão do mongoose para geolocalização
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;