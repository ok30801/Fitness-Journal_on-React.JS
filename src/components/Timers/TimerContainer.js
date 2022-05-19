import React from "react";
import Timer from "./Timer";
import {connect} from "react-redux";
import {
    updateAC,
    soundAC,
    timerUpStopAC,
    timerUpAC,
    readyCountAC,
    timerDownAC,
    timerDownStopAC,
    displayAC
} from "../../Redux/Reducers/timer-reducers";

const mapStateToProps = (state) => {

    return {
        menuTimer: state.power.menuTimer,
        minNumOne: state.timer.minNumOne,
        minNumTwo: state.timer.minNumTwo,
        secNumOne: state.timer.secNumOne,
        secNumTwo: state.timer.secNumTwo,
        intervalSec: state.timer.intervalSec,
        intervalMin: state.timer.intervalMin,
        ready: state.timer.stopTimer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        timerUp: (intervalSec, intervalMin, readyCount) => {
            dispatch(readyCountAC(readyCount))

            let timerUpStop = setInterval(function () {
                dispatch(timerUpAC(intervalSec, intervalMin))
                dispatch(timerUpStopAC(timerUpStop))
            }, 1000)
        },
        timerDown: (intervalSec, intervalMin, readyCount, secNumOne, secNumTwo, minNumOne, minNumTwo, fullTime) => {

            if (fullTime > 0) {
                let timerDownStop = setInterval(function () {
                    const minutes = Math.floor((fullTime - 1) / 60)
                    let seconds = (fullTime - 1) % 60
                    let secArr = seconds.toString().split('')
                    let minArr = minutes.toString().split('')
                    fullTime--

                    dispatch(timerDownAC(intervalSec, intervalMin, secNumOne, secNumTwo, minNumOne, minNumTwo, secArr,
                        minArr, minutes, seconds, fullTime))
                    dispatch(timerDownStopAC(timerDownStop))
                }, 1000)
            } /*else if (fullTime === 0) {
                alert('test')
            }*/
            dispatch(readyCountAC(readyCount))
            dispatch(displayAC(secNumOne, secNumTwo, minNumOne, minNumTwo))
        },

        sound: (volumeToggle) => {
            dispatch(soundAC(volumeToggle))
        },
        update: () => {
            dispatch(updateAC())
        }
    }
}

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer)

export default TimerContainer



