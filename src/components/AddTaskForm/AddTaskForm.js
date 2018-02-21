import React from 'react';
import './AddTaskForm.css';

const AddTaskForm = (props) => {
    return (
        <div className="form-block">
            <form>
                <input type="text" className="field" placeholder="Add new task" value={props.value} onChange={props.change}/>
                <button className="btn-add" onClick={props.click}>Add task</button>
            </form>
        </div>
    );
};

export default AddTaskForm;