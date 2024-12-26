import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ tasks, handleDeleteTask }) => (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0', alignItems: 'center' }}>
        {tasks.map((task) => (
            <li key={task.id} className="boxes" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: "#F0BB78", padding: "10px", borderRadius: "1rem", width: "100%" }}>
                <div style={{ color: '#543A14', backgroundColor: "#F0BB78", fontSize: "larger" }}>{task.name}</div>
                <button
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#543A14',
                        cursor: 'pointer',
                        fontSize: 'large',
                    }}
                    onClick={() => handleDeleteTask(task.id)}
                >
                    X
                </button>
            </li>
        ))}
    </ul>
);

TodoList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    handleDeleteTask: PropTypes.func.isRequired,
};

export default TodoList;