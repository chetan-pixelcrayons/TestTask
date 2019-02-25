const mongoose = require("mongoose");

let requestSchema = new mongoose.Schema({
    clientId: {type: Number, required: true},
    requestId: {type: String, required: true},
    hours: {type: Number, required: true}
});

// userSchema.pre('save', (error, doc, next) => {
//   next(new Error("something went wrong"));
// })

module.exports = mongoose.model('Request',requestSchema);