import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './Navbar';

export function App() {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos/');
      setTasks(response.data); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const postTask = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/todos/', { name: todo });
      setTodo(""); 
      fetchTasks(); 
    } catch (error) {
      console.error("Error posting the ToDo:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${taskId}/`); 
      fetchTasks();
    } catch (error) {
      console.error("Error deleting the ToDo:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App body">
      <Navbar />
      <div className='create-container'>
        <h2 className="heading">Create a ToDo</h2>
        <form onSubmit={postTask} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
          <div>
            <label className="data" htmlFor="todo">ToDo: </label>
            <input
              className="data"
              type="text"
              id="todo"
              name="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <input className="gradient-button" type="submit" value="Add ToDo!" />
          </div>
        </form>
      </div>
      <br></br>
      <div className='list-container'>
        <h2 className="heading">List of ToDos</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0', alignItems: 'center'}}>
          {tasks.map((task) => (
            <li key={task.id} className='boxes' style={{ display: 'flex', alignItems: 'center', width:"100%", display: 'flex', justifyContent: 'space-between', backgroundColor:"#F0BB78",padding:"10px", borderRadius:"1rem" }}>
              <div style={{ color: '#543A14', fontSize: "larger",backgroundColor:"#F0BB78", padding:"10px" }}>{task.name}</div>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#543A14',
                  cursor: 'pointer',
                  fontSize: 'large',
                }}
                onClick={() => deleteTask(task.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
