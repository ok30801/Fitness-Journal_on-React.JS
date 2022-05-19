import React from "react";
import Power from "./Power";
import {connect} from 'react-redux'
import {
    saveDataAC,
    createCardAC,
    updateNameCardAC,
    replacementNameCardAC,
    updateAC
} from '../../Redux/Reducers/power-reducers'

const mapStateToProps = (state) => {
    return {
        menuPower: state.power.menuPower,
        tableHead: state.power.tableHead,
        cards: state.power.cards
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createCard: (name, partBody) => {
            dispatch(createCardAC(name, partBody))
        },
        replacementNameCard: (textName) => {
            dispatch(replacementNameCardAC(textName))
        },
        updateNameCard: (index) => {
            dispatch(updateNameCardAC(index))
        },
        saveData: (index, countSets, weight, repetition) => {
            dispatch(saveDataAC(index, countSets, weight, repetition))
        },
        update: () => {
            dispatch(updateAC())
        }
    }
}
const PowerContainer = connect(mapStateToProps, mapDispatchToProps)(Power)

export default PowerContainer










