import React, { useState, useEffect } from 'react';
import './list.css';

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, incomplete
  const [sort, setSort] = useState('default'); // default, alphabetically

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleCompletion = (index) => {
    const newTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ));
    setTasks(newTasks);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'alphabetically') {
      return a.text.localeCompare(b.text);
    }
    return 0;
  });

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className='upper'>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='lower'>
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <label>
          Sort:
          <select value={sort} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
        </label>
      </div>

      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <div className='taskName'>{task.text}</div>
            <button onClick={() => toggleCompletion(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
