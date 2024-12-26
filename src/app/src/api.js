import axios from 'axios';

const API_URL = 'http://localhost:8000/todos/';


export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const postTask = async (name) => {
    await axios.post(API_URL, { name });
};

export const deleteTask = async (taskId) => {
    await axios.delete(`${API_URL}${taskId}/`);
};
