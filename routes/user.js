const User = require("../models/user");
const router = require("express").Router();

router.get("/", (req, res, next) => {
    User.find({}, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
});

router.post("/", (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    }).save(err => {
        if (err) {
            return next(err);
        }
        res.send(`New user created: ${req.body.username}`);
    });
});

module.exports = router;