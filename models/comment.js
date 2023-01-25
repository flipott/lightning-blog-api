const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: { type: String, required: true },
    time: { type: Date, default: Date.now },
    published: { type: Boolean, default: true },
    author: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);