import React from "react";
import classes from './Inputs.css'
import cn from 'classnames'

const Input = React.forwardRef(({placeholder, onChange, type, styleInput}, ref) => {
    return (
        <div>
            <input
                ref={ref}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className={cn(classes.input, {
                    [classes.attention]: styleInput,
                    // [classes.borderDef]: !styleInput
                })}
            />
        </div>
    )
})

export default Input