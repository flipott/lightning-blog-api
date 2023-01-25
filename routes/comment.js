const Comment = require("../models/comment");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Comment GET...")
})

module.exports = router;