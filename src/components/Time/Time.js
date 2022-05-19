import React, {useState, useEffect} from "react";
import classes from './Time.css'

const Time = () => {

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    return (
        <div className={classes.Time}>
            {dateTime.toLocaleTimeString()}
        </div>
    )
}

export default Time