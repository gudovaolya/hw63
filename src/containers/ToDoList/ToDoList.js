import React, {Component} from 'react';
import axios from '../../axios-hw63';

import './ToDoList.css';
import Task from "../../components/Task/Task";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import Spinner from '../../components/Spinner/Spinner';


class ToDoList extends Component {

    state = {
        tasks: [],
        currentTask: '',
        loading: false
    };

    changeCurrentTask = (event) => {
        const currentTask = event.target.value;
        this.setState({currentTask});
    };

    getTasks = () => {
        this.setState({loading: true});
        axios.get('tasks.json').then(response => {
            return response.data;
        }).then(tasksData => {
            const tasks = [...this.state.tasks];
            for (let key in tasksData) {
                tasksData[key].id = key;
                tasks.push(tasksData[key]);
            }
            this.setState({tasks, loading: false});
        })
    };

    componentDidMount() {
        this.getTasks();
    };

    addTaskHandler = (event) => {
        event.preventDefault();
        let task = {
            taskText: this.state.currentTask,
            dateTime:   `${new Date()}`
        };
        axios.post('tasks.json', task).then(response => {
            task.id = response.data.name;
            const tasks = [...this.state.tasks];
            tasks.push(task);
            this.setState({tasks});
        }).finally(() => {
           this.props.history.push('/todolist');
        });
    };

    removeTask = (id) => {
        const index = this.state.tasks.findIndex(item => item.id === id);
        const tasks = [...this.state.tasks];
        tasks.splice(index, 1);
        axios.delete('tasks/' + id + '.json').then(response => {
            this.setState({tasks});
        }).finally(() => {
            this.props.history.push('/todolist');
        });

    };

    showDate = (dateTime) => {
       return `${dateTime.substr(8,2)} 
               ${dateTime.substr(4,3)} 
               ${dateTime.substr(11,4)}`;
    };

    render() {

        let tasks = (
            <div>
                {
                    this.state.tasks.map((item) => {
                        return <Task
                            key={item.id}
                            task={item.taskText}
                            date={this.showDate(item.dateTime)}
                            remove={() => this.removeTask(item.id)}>
                        </Task>
                    })
                }
            </div>
        );

        if (this.state.loading) {
            tasks = <Spinner />
        }

        return (
            <div className="container content">
                <AddTaskForm
                    value = {this.state.currentTask}
                    change={this.changeCurrentTask}
                    click = {this.addTaskHandler}>
                </AddTaskForm>
                {tasks}
            </div>

        );
    }
}

export default ToDoList;
