import React, { useState } from 'react';
import TaskModal from './TaskModal';

const initialTasks = {
  todo: ['Create UI', 'Database'],
  inProgress: ['Backend API', 'Auth System'],
  done: ['Login', 'Design']
};

function ProjectBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <>
      {/* Main board */}
      <div style={{ padding: '20px' }}>
        <h2>College Project</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {['todo', 'inProgress', 'done'].map((status) => (
            <div key={status} style={{ width: '30%', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <h3>{status === 'todo' ? 'To Do' : status === 'inProgress' ? 'In Progress' : 'Done'}</h3>
              {tasks[status].map((task, index) => (
                <div
                  key={index}
                  style={{ padding: '5px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '3px', cursor: 'pointer' }}
                  onClick={() => setSelectedTask(task)}
                >
                  {task}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Task modal */}
      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </>
  );
}

export default ProjectBoard;
