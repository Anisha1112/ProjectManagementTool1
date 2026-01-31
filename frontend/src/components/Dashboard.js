import React from 'react';
import { useNavigate } from 'react-router-dom';

const projects = [
  { id: 'college-project', name: 'College Project' },
  { id: 'office-work', name: 'Office Work' },
  { id: 'personal-tasks', name: 'Personal Tasks' },
];

function Dashboard() {
  const navigate = useNavigate();
  const username = "Anisha"; // Fetch dynamically from backend later

  const openProject = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {username} 👋</h2>
      <button
        style={{ margin: '10px 0', padding: '10px 20px', cursor: 'pointer' }}
        onClick={() => alert('Create Project Modal / Page')}
      >
        + Create New Project
      </button>

      <h3>Your Projects:</h3>
      <ul>
        {projects.map(project => (
          <li key={project.id} onClick={() => openProject(project.id)} style={{ cursor: 'pointer', margin: '5px 0' }}>
            📁 {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
