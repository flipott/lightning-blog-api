const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const mongoDb = process.env.DB;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to Mongo DB"));
console.log(db);
const app = express();




app.listen(3000, () => console.log("Server is currently running on port 3000."));