const Post = require("../models/post");
const Comment = require("../models/comment");
const router = require("express").Router({ mergeParams: true });
const ObjectId = require('mongoose').Types.ObjectId; 

// Get all comments for a post
router.get("/", (req, res, next) => {
    Post.find({ id: req.params.postId }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send(results[0].comments);
    });
});

// Create comment for a post
router.post("/", (req, res, next) => {
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

// Get specific comment
router.get("/:commentId", (req, res, next) => {
    Comment.find({ _id: req.params.commentId }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.send(results[0]);
    });
});

// Delete specific comment
router.delete("/:commentId", (req, res, next) => {
    Comment.findByIdAndDelete(req.params.commentId, (err, results) => {
        if (err) {
            return next(err);
        }
        Post.findByIdAndUpdate(
            req.params.postId,
            {$pull: { comments: { _id: ObjectId(req.params.commentId) }}},
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