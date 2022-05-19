import React from "react";
import classes from '../History.css'

const HistorySets = props => {
    return (
        <article>
            <div className={classes.blockData}>
                <div className={classes.header}>
                    <div className={classes.titleCard}>{props.nameCard}</div>
                </div>
                <table>
                    <thead>
                    <tr>
                        <td>Подход</td>
                        <td>Нагрузка, кг.</td>
                        <td>Число повторений</td>
                    </tr>
                    </thead>
                    {
                        props.filter.sets.map(set =>
                            <tbody key={set.id}>
                            <tr>
                                <td>{set.countSets}.</td>
                                <td>{set.weight}</td>
                                <td>{set.repetitions}</td>
                            </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
        </article>
    )
}

export default HistorySets