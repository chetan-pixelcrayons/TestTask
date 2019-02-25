const mongoose = require("mongoose");

// Defining the Request Schema
let requestSchema = new mongoose.Schema({
    clientId: {type: Number, required: true},
    requestId: {type: String, required: true},
    hours: {type: Number, required: true}
});

module.exports = mongoose.model('Request',requestSchema);