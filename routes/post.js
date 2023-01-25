const Post = require("../models/post");
const Comment = require("../models/comment");
const { Schema } = require("mongoose");
const router = require("express").Router();
const mongoose = require('mongoose');

// POSTS

router.get("/", (req, res) => {
    Post.find({}, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
});

router.get("/:postId", (req, res, next) => {
    Post.find({ id: req.params.postId }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
});


router.post("/", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        username: req.body.username,
    }).save((err, results) => {
        if (err) {
            return next(err);
        }
        res.send(results);
    });
});

// COMMENTS

router.get("/:postId/:comments", (req, res, next) => {
    Post.find({ id: req.params.postId }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send(results[0].comments);
    });
});

router.post("/:postId/:comments", (req, res, next) => {
    const comment = new Comment({
        author: req.body.author,
        body: req.body.body,
    }).save((err, results) => {
        if (err) {
            return next(err);
        }
        Post.findByIdAndUpdate(
            req.params.postId,
            {$push: { comments: results }},
            {safe: true, upsert: true, new : true},
            (err, results) => {
                if (err) {
                    return next(err);
                }
                res.send("Successfully added comment to post.");
            });
    });
});

router.get("/:postId/:comments/:commentId", (req, res, next) => {
    Comment.find({ id: req.params.commentId }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send(results[0]);
    });
});

router.delete("/:postId/:comments/:commentId", (req, res, next) => {
    Comment.findByIdAndDelete(req.params.commentId, (err, results) => {
        if (err) {
            return next(err);
        }
        Post.findByIdAndUpdate(
            req.params.postId,
            {$pull: { "comments._id" : mongoose.id(req.params.commentId)} },
            {safe: true, new: true},
            (err, results) => {
                if (err) {
                    return next(err);
                }
                res.send("Comment successfully deleted.");
            });
    });
});







module.exports = router;