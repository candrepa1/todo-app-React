import React, { useReducer, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ToDos from './ToDos.js';

const Box = () => {
    const local = () => {
        const initial = JSON.parse(localStorage.getItem('todo'));
        if(JSON.parse(localStorage.getItem('todo'))) {
            return initial;
        } else {
            return [];
        }
    }

    const [input, setInput] = useState('');
    const [tasks, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'add': {
                return(
                    [...state, { id: nanoid(), text: action.text}]
                );
            }
            case 'remove': {
                return state.filter((task) => task.id !== action.id);
            }
            default:
                return null;
        }
    }, local());

    const handleChange = (e) => {
        const typed = e.target.value;
        setInput(typed);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'add', text: input });
        document.getElementById('input-field').value = '';
    };

    const remove = (id) => {
        dispatch({ type: 'remove', id: id})
    };

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(tasks));
    }, [tasks]);

    return(
        <>
            <form onSubmit={handleSubmit} className="mb-5">
                <input type="text" name="todo" id="input-field" onChange={handleChange}/>
                <button className="btn btn-light">+</button>
            </form>
            <ToDos tasks={tasks} remove={remove}/>
        </>
    );
}

export default Box;