import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ProjectModal from './ProjectModal';
import TaskModal from './TaskModal';
import KanbanBoard from './KanbanBoard';

const Dashboard = ({ user, onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('kanban');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

          const [projectsResponse, tasksResponse, usersResponse] = await Promise.all([
        fetch('http://localhost:3001/projects', { headers }),
        fetch('http://localhost:3001/tasks', { headers }),
        fetch('http://localhost:3001/users', { headers })
      ]);

      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
      }

      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(tasksData);
      }

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  const handleProjectSave = (project) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
      setEditingProject(null);
    } else {
      setProjects([...projects, project]);
    }
  };

  const handleTaskSave = (task) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setEditingTask(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/projects/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.ok) {
          setProjects(projects.filter(p => p.id !== projectId));
          setTasks(tasks.filter(t => t.project_id !== projectId));
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.ok) {
          setTasks(tasks.filter(t => t.id !== taskId));
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const task = tasks.find(t => t.id === taskId);
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, status: newStatus })
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Collaborative TaskFlow</h1>
          <div className="user-info">
            <span>Welcome, {user?.name || 'User'}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects ({projects.length})
        </button>
        <button 
          className={`nav-button ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          My Tasks ({tasks.filter(task => task.assignee_id === user?.id).length})
        </button>
        <button 
          className={`nav-button ${activeTab === 'all-tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('all-tasks')}
        >
          All Tasks ({tasks.length})
        </button>
        <button 
          className={`nav-button ${activeTab === 'kanban' ? 'active' : ''}`}
          onClick={() => setActiveTab('kanban')}
        >
          Kanban Board
        </button>
      </nav>

      <main className="dashboard-main">
        {activeTab === 'projects' && (
          <div className="projects-section">
            <div className="section-header">
              <h2>Projects</h2>
              <button 
                className="add-button"
                onClick={() => {
                  setEditingProject(null);
                  setShowProjectModal(true);
                }}
              >
                + New Project
              </button>
            </div>
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <div className="project-actions">
                      <button 
                        onClick={() => handleEditProject(project)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-meta">
                    <span className="creator">Created by: {project.creator?.name}</span>
                    <span className="task-count">
                      Tasks: {tasks.filter(t => t.project_id === project.id).length}
                    </span>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="empty-state">
                  <p>No projects yet. Create your first project to get started!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <div className="section-header">
              <h2>My Tasks</h2>
              <button 
                className="add-button"
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskModal(true);
                }}
              >
                + New Task
              </button>
            </div>
            <div className="tasks-list">
              {tasks.filter(task => task.assignee_id === user?.id).map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <div className="task-actions">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className={`status-select ${task.status}`}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="in-qa">In QA</option>
                        <option value="done">Done</option>
                      </select>
                      <button 
                        onClick={() => handleEditTask(task)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span>Project: {task.project?.name}</span>
                    {task.due_date && (
                      <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              ))}
              {tasks.filter(task => task.assignee_id === user?.id).length === 0 && (
                <div className="empty-state">
                  <p>No tasks assigned to you yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'all-tasks' && (
          <div className="tasks-section">
            <div className="section-header">
              <h2>All Tasks</h2>
              <button 
                className="add-button"
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskModal(true);
                }}
              >
                + New Task
              </button>
            </div>
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <div className="task-actions">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className={`status-select ${task.status}`}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="in-qa">In QA</option>
                        <option value="done">Done</option>
                      </select>
                      <button 
                        onClick={() => handleEditTask(task)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p>{task.description}</p>
                  <div className="task-meta">
                    <span>Project: {task.project?.name}</span>
                    <span>Assignee: {task.assignee?.name}</span>
                    {task.due_date && (
                      <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="empty-state">
                  <p>No tasks created yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'kanban' && (
          <div className="kanban-section">
            <div className="section-header">
              <h2>Kanban Board</h2>
              <button 
                className="add-button"
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskModal(true);
                }}
              >
                + New Task
              </button>
            </div>
            <KanbanBoard
              tasks={tasks}
              onTaskUpdate={(updatedTask) => {
                setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
              }}
              onTaskMove={(taskId, newStatus) => {
                handleStatusChange(taskId, newStatus);
              }}
            />
          </div>
        )}
      </main>

      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setEditingProject(null);
        }}
        onSave={handleProjectSave}
        project={editingProject}
        users={users}
      />

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        onSave={handleTaskSave}
        task={editingTask}
        projects={projects}
        users={users}
      />
    </div>
  );
};

export default Dashboard; 