const router = require("express").Router({ mergeParams: true });
const jwt = require("jsonwebtoken");
require('dotenv').config()

router.post("/", (req, res, next) => {
    const token = jwt.sign({ username: req.body.username }, process.env.SECRET_KEY, { expiresIn: "1m" });
    res.json({
        token: token
    });
});

module.exports = router;