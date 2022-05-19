import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './NavTabs.css';

const NavTabs = () => {

    const activeTab = {
        height: '41px',
        marginTop: '4px',
        borderBottom: 'none',
        borderTop: '2px solid #0be076',
        borderRight: '2px solid #0be076',
        borderLeft: '2px solid #0be076',
        color: '#0be076'
    }
    return (
        <nav className={classes.Navigation}>
            <div className={classes.tabItem}>
                <NavLink to="/power" className={classes.bg} activeStyle={activeTab}>
                    Тип упражнений
                </NavLink>
            </div>

            <div className={classes.tabItem}>
                <NavLink to="/history" className={classes.bg} activeStyle={activeTab}>
                    История тренировок
                </NavLink>
            </div>

            <div className={classes.tabItem}>
                <NavLink to="/timer" className={classes.bg} activeStyle={activeTab}>
                    Секундомер
                </NavLink>
            </div>
        </nav>
    )
}

export default NavTabs
