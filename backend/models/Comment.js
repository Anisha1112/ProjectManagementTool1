const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
text: String,
taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Comment', CommentSchema);