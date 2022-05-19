import React from "react";
import NavBar from "../Navigation/NavBar/NavBar";
import Time from "../Time/Time";
import SettingsIcon from '@material-ui/icons/Settings';
import classes from './Aerobics.css'


const Aerobics = props => {
    console.log('Aerobics.props >>>', props)
    return (
            <div className={classes.wrapper}>
                <NavBar link={props.menuPower}/>
                <Time/>
                <div className={classes.Aerobics}>
                    <h1>In dev...</h1>
                    <SettingsIcon/>
                </div>
            </div>
    )
}

export default Aerobics