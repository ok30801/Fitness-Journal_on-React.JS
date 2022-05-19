import React from "react";
import Aerobics from "./index";
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    console.log('Aerobics.state >>>', state)
    return {
        menuPower: state.power.menuPower,
        tableHead: state.power.tableHead,
        cards: state.power.cards
    }
}

const AerobicsContainer = connect(mapStateToProps)(Aerobics)


export default AerobicsContainer