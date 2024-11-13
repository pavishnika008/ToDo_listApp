import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import deleteimg from './delete.png';
import editimg from './edit.png';
import checkimg from './checkcircle.png';

export default function Create() {
  let [ToDo, setToDo] = useState('');
  let [task, setTask] = useState([]);
  let [editIndex, setEditIndex] = useState(null);

  function save(e) {
    e.preventDefault();
    if (editIndex !== null) {
      // If in edit mode, update the existing task
      const updatedTasks = [...task];
      updatedTasks[editIndex].text = ToDo;
      setTask(updatedTasks);
      setEditIndex(null); // Exit edit mode
      setToDo(''); // Clear input
    } else {
      // If not in edit mode, add a new task as an object with `text` and `completed`
      axios
        .post('https://6719d694acf9aa94f6a7fecb.mockapi.io/react/Demo', { ToDo })
        .then((s) => {
          alert('ToDo saved!!!');
          console.log(s);
          setTask([...task, { text: ToDo, completed: false }]); // Add new task object
          setToDo('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Delete a task
  function deleteTask(index) {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      const newTasks = task.filter((_, i) => i !== index);
      setTask(newTasks);
    }
  }

  // Toggle task completion
  function toggleComplete(index) {
    const updatedTasks = [...task];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTask(updatedTasks);
  }

  // Start editing a task
  function startEdit(index) {
    setEditIndex(index);
    setToDo(task[index].text); // Set the input field with the current task text for editing
  }

  return (
    <div className='header'>
      <h1>ToDo List</h1>
      <form className='form' onSubmit={save}>
        <input
          type="text"
          placeholder='Enter a Task....'
          value={ToDo}
          onChange={(e) => setToDo(e.target.value)}
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button> {/* Update button text in edit mode */}
      </form>

      <div className="task-list">
        {task.map((task, index) => (
          <p key={index} className={task.completed ? 'completed' : ''}>
            <img
              className='checkimg'
              src={checkimg}
              alt="Check icon"
              onClick={() => toggleComplete(index)} // Toggle task completion
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />
            <span>{task.text}</span>
            <div className="icon-container">
        <img
          className="editimg"
          src={editimg}
          alt="Edit icon"
          onClick={() => startEdit(index)} // Trigger edit mode
        />
        <img
          className="deleteimg"
          src={deleteimg}
          alt="Delete icon"
          onClick={() => deleteTask(index)} // Trigger delete
        />
      </div>
          </p>
        ))}
      </div>
    </div>
  );
}
