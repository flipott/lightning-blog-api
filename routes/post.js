const Post = require("../models/post");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Post GET...")
})

module.exports = router;