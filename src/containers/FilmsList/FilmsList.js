import React, {Component, Fragment} from 'react';
import './FilmsList.css';
import Film from "../../components/Film/Film";
import axios from "../../axios-hw63";

class FilmsList extends Component {

    state = {
        films: [],
        filmNameValue: ''
    };

    changeFilmName = (event, id) => {
        const index = this.state.films.findIndex(film => film.id === id);
        const updateFilm = this.state.films[index];
        updateFilm.title = event.target.value;
        const films = [...this.state.films];
        films[index] = updateFilm;
        this.setState({films});
    };

    updateFilmName = (event, id) => {
        const index = this.state.films.findIndex(film => film.id === id);
        const updateFilm = this.state.films[index];
        axios.patch(`films/${id}.json`, {title: updateFilm.title}).finally(() => {
            this.props.history.push('/filmslist');
        });
    };

    changeNewFilmNameValue = (event) => {
        event.persist();
        this.setState(prevState => {
            return {filmNameValue: event.target.value}
        })
    };

    removeFilmFromList = (id) => {
        const index = this.state.films.findIndex(film => film.id === id);
        const films = [...this.state.films];
        films.splice(index, 1);

        axios.delete(`films/${id}.json`).then(response => {
            this.setState({films});
        }).finally(() => {
            this.props.history.push('/filmslist');
        });
    };

    addFilmHandler = (event) => {
        event.preventDefault();
        const newFilm = {};
        newFilm.title = this.state.filmNameValue;
        axios.post('films.json', newFilm).then(response => {
            newFilm.id = response.data.name;
            const films = [...this.state.films];
            films.push(newFilm);
            this.setState({films});
        }).finally(() => {
            this.props.history.push('/filmslist');
        });

    };

    getFilms = () => {
        axios.get('films.json').then(response => {
            return response.data
        }).then(filmsData => {
            const films = [...this.state.films];
            for (let key in filmsData) {
                filmsData[key].id = key;
                films.push(filmsData[key]);
            }
            this.setState({films});
        })
    };

    componentDidMount() {
        this.getFilms();
    };





    renderFilmsBlock = () => {
        if (this.state.films.length > 0) {
            return (
                <Fragment>
                    <h4>To watch list:</h4>
                    {this.state.films.map(film => (
                        <Film
                            key={film.id}
                            id={film.id}
                            title={film.title}
                            change={this.changeFilmName}
                            update={this.updateFilmName}
                            remove={this.removeFilmFromList}
                        />
                    ))}
                </Fragment>
            )
        } else {
            return <p>There are no movies in the list!</p>
        }
    };

    render () {

        return(
            <div className="container content">
                <div className="form-block">
                    <form>
                        <input className="field" onChange={this.changeNewFilmNameValue} type="text" placeholder="Enter film name"/>
                        <button className="btn" onClick={this.addFilmHandler}>Add</button>
                    </form>
                </div>
                <div className="films-block">
                    {this.renderFilmsBlock()}
                </div>
            </div>

        )
    }
};

export default FilmsList;
