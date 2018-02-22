import React, { Component, Fragment } from 'react';
import {Switch, Route} from 'react-router-dom';

import Header from "./components/Header/Header";
import ToDoList from "./containers/ToDoList/ToDoList";
import FilmsList from "./containers/FilmsList/FilmsList";
import Home from "./containers/Home/Home";

class App extends Component {
  render() {
    return (
      <Fragment>
          <Header />
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/todolist" exact component={ToDoList}/>
              <Route path="/filmslist" exact component={FilmsList}/>
              <Route render={() => <h1>404 page not found</h1>}/>
          </Switch>
      </Fragment>
    );
  }
}

export default App;
