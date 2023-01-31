const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config()

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const mongoDb = process.env.DB;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to Mongo DB"));
const app = express();

app.use(express.json());
app.use(cors())

//Routes
app.use('/user', routes.user);
app.use('/post', routes.post);
app.use('/post/:postId/comments', routes.comment);
app.use('/login', routes.login);

app.listen(port, () => console.log(`Server is currently running on port ${port}.`));