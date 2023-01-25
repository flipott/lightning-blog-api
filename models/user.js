const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    posts: {type: Array, default: []},
});

module.exports = mongoose.model("User", UserSchema);