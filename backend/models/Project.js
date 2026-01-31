const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
title: String,
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Project', ProjectSchema);