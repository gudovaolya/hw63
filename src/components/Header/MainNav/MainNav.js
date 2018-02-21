import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';

const MainNav = () => {
    return (
        <nav className="main-nav container">
            <ul>
                <li><NavLink
                    exact
                    to="/"
                    activeClassName="active"
                >Нome</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/todolist"
                        activeClassName="active"
                    >My ToDoList</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/filmslist"
                        activeClassName="active"
                    >My Films</NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default MainNav;