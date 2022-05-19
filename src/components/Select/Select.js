import React from "react";
import classes from './Select.css'
import cn from 'classnames'

const Select = React.forwardRef(({onChange, styleSelect, value, children}, ref) => {

    return (
        <div>
            <select
                ref={ref}
                onChange={onChange}
                className={cn(classes.select, {
                    [classes.attention]: styleSelect,
                })}
            >
                {children}
            </select>
        </div>
    )
})

export default Select