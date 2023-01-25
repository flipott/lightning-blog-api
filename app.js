const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");


require('dotenv').config()
const mongoDb = process.env.DB;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to Mongo DB"));
console.log(db);
const app = express();

//Routes
app.use('/user', routes.user);
app.use('/post', routes.post);
app.use('/comment', routes.comment);




app.listen(3000, () => console.log("Server is currently running on port 3000."));