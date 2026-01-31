const express = require('express');
const Project = require('../models/Project');


const router = express.Router();


// CREATE PROJECT
router.post('/create', async (req, res) => {
const { title, owner } = req.body;
const project = new Project({ title, owner, members: [owner] });
await project.save();
res.json(project);
});


// GET USER PROJECTS
router.get('/:userId', async (req, res) => {
const projects = await Project.find({ members: req.params.userId });
res.json(projects);
});


module.exports = router;