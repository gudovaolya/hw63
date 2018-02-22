import React, {Component} from 'react';
import './Film.css';

class Film extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.title !== this.props.title
    };

    render () {
        return (
            <div className="film-item">
                <input className="film-name" value={this.props.title}
                       onChange={(event) => this.props.change(event, this.props.id)}
                       type="text"/>
                <button className="btn" onClick={(event) => this.props.update(event, this.props.id)}>Update</button>
                <button className="btn btn-delete-film" onClick={() => this.props.remove(this.props.id)}>Delete</button>
            </div>
        )
    }
}

export default Film;