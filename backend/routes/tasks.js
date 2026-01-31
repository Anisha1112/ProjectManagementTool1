const express = require('express');
const Task = require('../models/Task');


const router = express.Router();


// CREATE TASK
router.post('/create', async (req, res) => {
const task = new Task(req.body);
await task.save();
res.json(task);
});


// GET TASKS BY PROJECT
router.get('/:projectId', async (req, res) => {
const tasks = await Task.find({ projectId: req.params.projectId });
res.json(tasks);
});


module.exports = router;