import React, { useState, useEffect } from 'react'
import axios from 'axios'

function GetTask(){
    const [tasks,setTasks] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/todos')
        .then(res => {
            setTasks(res.data)
        })
    }, [])

    return (
        <div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} class="data">{task.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default GetTask