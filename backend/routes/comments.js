const express = require('express');
const Comment = require('../models/Comment');


const router = express.Router();


// ADD COMMENT
router.post('/add', async (req, res) => {
const comment = new Comment(req.body);
await comment.save();
res.json(comment);
});


// GET COMMENTS BY TASK
router.get('/:taskId', async (req, res) => {
const comments = await Comment.find({ taskId: req.params.taskId });
res.json(comments);
});


module.exports = router;