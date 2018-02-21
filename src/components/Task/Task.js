import React from 'react';
import './Task.css';


const Task = (props) => {
    return(
        <div className="task">
            <div className="task-txt"><span>Published: {props.date}</span>{props.task}</div>
            <button className="btn-delete" onClick={props.remove}>Delete</button>
        </div>
    )
};

export default Task;