import React from "react";
import History from "./History";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        menuHistory: state.power.menuHistory,
    }
}
const HistoryContainer = connect(mapStateToProps)(History)

export default HistoryContainer