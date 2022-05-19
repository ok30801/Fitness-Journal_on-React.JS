import React from "react";

const TableSets = props => {
    return (
        <tbody>
            <tr>
                <td>{props.count}.</td>
                <td>{props.weight}</td>
                <td>{props.repetitions}</td>
            </tr>
        </tbody>
    )
}

export default TableSets