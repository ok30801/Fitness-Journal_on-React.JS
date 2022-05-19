import React from "react";
import classes from './NavBar.css'
import {NavLink} from "react-router-dom";

const NavBar = props => {

    const activeLinkMenu = {
        color: '#0be076',
        padding: '13px 0',
        fontWeight: '500'
    }

    const clearLocalStorage = () => {
        localStorage.clear()
    }

    const nickNameDef = JSON.parse(localStorage.getItem('userData')).map(item => item.nickName).toString()
    const nickNameFirstLetter = nickNameDef.slice(0, 1).toUpperCase()
    return (
        <nav className={classes.NavBar} id='navigation'>
            <section>
                <NavLink to={props.link} activeStyle={activeLinkMenu}>
                    <i className="fas fa-dumbbell"></i> Силовая тренировка
                </NavLink>

                <NavLink to="/aerobics" activeStyle={activeLinkMenu}>
                    <i className="fas fa-running"></i> Аэробная тренировка
                </NavLink>
                <NavLink to="/">
                    <div className={classes.user} onClick={clearLocalStorage}>
                        <span className={classes.nickName}>{nickNameFirstLetter}</span>
                    </div>
                </NavLink>
            </section>
        </nav>
    )
}

export default NavBar

