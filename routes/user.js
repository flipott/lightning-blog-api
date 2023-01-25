const User = require("../models/user");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("User GET...")
})

module.exports = router;