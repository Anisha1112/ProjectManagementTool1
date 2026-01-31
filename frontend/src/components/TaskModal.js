import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connect to backend socket
const socket = io('http://localhost:5000');

function TaskModal({ task, onClose }) {
  const [comments, setComments] = useState(['Please finish today', 'UI looks good 👍']);
  const [newComment, setNewComment] = useState('');

  // Real-time comments
  useEffect(() => {
    socket.on('comment', ({ projectId, task: t, comment }) => {
      if (t === task) setComments(prev => [...prev, comment]);
    });
    return () => socket.off('comment');
  }, [task]);

  const addComment = () => {
    if (newComment.trim()) {
      // Emit comment to backend
      socket.emit('comment', { projectId: 'college-project', task, comment: newComment });
      setNewComment('');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '5px', width: '400px' }}>
        <h3>Task: {task}</h3>
        <p><strong>Assigned to:</strong> Anisha</p>
        <p><strong>Status:</strong> To Do</p>
        <p><strong>Description:</strong> Design the login and register pages</p>

        <h4>Comments:</h4>
        <ul>
          {comments.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add comment"
        />
        <button onClick={addComment}>Add Comment</button>
        <button onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
      </div>
    </div>
  );
}

export default TaskModal;
