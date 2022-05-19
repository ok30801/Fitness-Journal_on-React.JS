import React from 'react'
import classes from './Button.css'

const Button = ({disabled, onClick, i, text}) => {

    return (
        <button disabled={disabled} className={classes.save + ' ' + classes.karVested} onClick={onClick}>
            {i}{text}
        </button>
    )
}

export default Button