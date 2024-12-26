import React from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ todo, setTodo, handleAddTask }) => (
    <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
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
);

TodoForm.propTypes = {
    todo: PropTypes.string.isRequired,
    setTodo: PropTypes.func.isRequired,
    handleAddTask: PropTypes.func.isRequired,
};

export default TodoForm;