import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { fetchTasks, postTask, deleteTask } from './api';

export function App() {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleFetchTasks = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (!todo.trim()) return;

    try {
      await postTask(todo);
      setTodo("");
      handleFetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      handleFetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <div className="App body">
      <Navbar />
      <div className="create-container">
        <h2 className="heading">Create a ToDo</h2>
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          handleAddTask={handleAddTask}
        />
      </div>
      <div className="list-container">
        <h2 className="heading">List of ToDos</h2>
        <TodoList tasks={tasks} handleDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
}

export default App;
