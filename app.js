const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");


require('dotenv').config()
const mongoDb = process.env.DB;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to Mongo DB"));
const app = express();

app.use(express.json());

//Routes
app.use('/user', routes.user);
app.use('/post', routes.post);
app.use('/post/:postId/comments', routes.comment);


app.listen(3000, () => console.log("Server is currently running on port 3000."));