import React from "react";
import classes from './Loader.css'

const Loader = (props) => {
    return (
        <div className={props.hide}>
            <div className={classes.Loader}></div>
        </div>
    )
}
export default Loader