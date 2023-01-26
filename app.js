const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

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

app.post('/login', async(req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send("All input is required.");
    }
    const user = await User.find({ username: req.body.username });

    if (user.length) {
        const token = jwt.sign(
            { user_id: user._id},
            process.env.TOKEN,
            {
              expiresIn: "2h",
            }
          );

          // Save user token
          user.token = token;
          res.status(200).json(user);
        }
    res.status(400).send("Invalid Credentials");
});

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


app.listen(port, () => console.log(`Server is currently running on port ${port}.`));