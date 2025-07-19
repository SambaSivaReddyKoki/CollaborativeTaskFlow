import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';

const KanbanBoard = ({ tasks, onTaskUpdate, onTaskMove }) => {
  const [columns, setColumns] = useState({
    'To Do': {
      title: 'To Do',
      tasks: [],
      wipLimit: null,
      color: '#e53e3e'
    },
    'In Progress': {
      title: 'In Progress', 
      tasks: [],
      wipLimit: 3,
      color: '#d69e2e'
    },
    'In QA': {
      title: 'In QA',
      tasks: [],
      wipLimit: 2,
      color: '#3182ce'
    },
    'Done': {
      title: 'Done',
      tasks: [],
      wipLimit: null,
      color: '#38a169'
    }
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  useEffect(() => {
    // Organize tasks into columns based on status
    const organizedColumns = { ...columns };
    
    Object.keys(organizedColumns).forEach(columnKey => {
      organizedColumns[columnKey].tasks = tasks.filter(task => {
        const status = task.status || 'todo';
        return getColumnForStatus(status) === columnKey;
      });
    });
    
    setColumns(organizedColumns);
  }, [tasks, columns]);

  const getColumnForStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'in-qa':
        return 'In QA';
      case 'done':
        return 'Done';
      default:
        return 'To Do';
    }
  };

  const getStatusForColumn = (columnName) => {
    switch (columnName) {
      case 'To Do':
        return 'todo';
      case 'In Progress':
        return 'in-progress';
      case 'In QA':
        return 'in-qa';
      case 'Done':
        return 'done';
      default:
        return 'todo';
    }
  };

  const handleDragStart = (e, task, columnName) => {
    setDraggedTask({ ...task, sourceColumn: columnName });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnName) => {
    e.preventDefault();
    setDragOverColumn(columnName);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    
    if (!draggedTask || draggedTask.sourceColumn === targetColumn) {
      setDraggedTask(null);
      setDragOverColumn(null);
      return;
    }

    // Check WIP limit
    const targetColumnData = columns[targetColumn];
    if (targetColumnData.wipLimit && 
        targetColumnData.tasks.length >= targetColumnData.wipLimit) {
      alert(`WIP limit reached for ${targetColumn}. Please complete some tasks first.`);
      setDraggedTask(null);
      setDragOverColumn(null);
      return;
    }

    // Update task status
    const newStatus = getStatusForColumn(targetColumn);
    const updatedTask = { ...draggedTask, status: newStatus };
    
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
    }
    
    if (onTaskMove) {
      onTaskMove(draggedTask.id, newStatus);
    }

    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const getTaskTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'bug':
        return '🐛';
      case 'feature':
        return '✨';
      case 'task':
        return '📋';
      case 'story':
        return '📖';
      default:
        return '📋';
    }
  };

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <h2 className="text-gradient">Kanban Board</h2>
        <div className="kanban-stats">
          <span className="stat-item">
            <span className="stat-label">Total Tasks:</span>
            <span className="stat-value">{tasks.length}</span>
          </span>
          <span className="stat-item">
            <span className="stat-label">In Progress:</span>
            <span className="stat-value">{columns['In Progress'].tasks.length}</span>
          </span>
          <span className="stat-item">
            <span className="stat-label">Completed:</span>
            <span className="stat-value">{columns['Done'].tasks.length}</span>
          </span>
        </div>
      </div>

      <div className="kanban-columns">
        {Object.entries(columns).map(([columnName, columnData]) => (
          <div
            key={columnName}
            className={`kanban-column ${dragOverColumn === columnName ? 'drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, columnName)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, columnName)}
          >
            <div className="column-header" style={{ borderTopColor: columnData.color }}>
              <div className="column-title">
                <h3>{columnName}</h3>
                <span className="task-count">{columnData.tasks.length}</span>
              </div>
              {columnData.wipLimit && (
                <div className="wip-limit">
                  <span className="wip-current">{columnData.tasks.length}</span>
                  <span className="wip-separator">/</span>
                  <span className="wip-max">{columnData.wipLimit}</span>
                </div>
              )}
            </div>

            <div className="column-content">
              {columnData.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-card ${draggedTask?.id === task.id ? 'dragging' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, columnName)}
                >
                  <div className="task-header">
                    <div className="task-type">
                      {getTaskTypeIcon(task.type)}
                    </div>
                    <div className="task-priority">
                      {getPriorityIcon(task.priority)}
                    </div>
                  </div>
                  
                  <div className="task-title">
                    {task.title}
                  </div>
                  
                  <div className="task-description">
                    {task.description?.substring(0, 100)}
                    {task.description?.length > 100 && '...'}
                  </div>
                  
                  <div className="task-footer">
                    <div className="task-meta">
                      <span className="task-id">#{task.id}</span>
                      {task.estimated_hours && (
                        <span className="task-hours">{task.estimated_hours}h</span>
                      )}
                    </div>
                    
                    <div className="task-assignee">
                      {task.assignee && (
                        <div className="assignee-avatar">
                          {task.assignee.name ? task.assignee.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {columnData.tasks.length === 0 && (
                <div className="empty-column">
                  <div className="empty-icon">📋</div>
                  <p>No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard; 