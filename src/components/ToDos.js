import React from 'react';

const ToDos = (props) => {
    const tasks = props.tasks;
    const remove = props.remove;

    const list = tasks.map((task) => 
        <li key={task.id}>
            {task.text}
            <button className="btn btn-light" onClick={() => remove(task.id)}>-</button>
        </li>);
        
    return(
        <ul>
            {list}
        </ul>
    );
}

export default ToDos;