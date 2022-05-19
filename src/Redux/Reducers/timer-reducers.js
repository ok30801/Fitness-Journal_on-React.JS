import AudioEnd from '../../components/Timers/Audio/chess.mp3'
import AudioTick from '../../components/Timers/Audio/tick.mp3'

const UPDATE_TIMER = 'UPDATE_TIMER'
const SOUND = 'SOUND'
const TIMER_UP = 'TIMER_UP_PLAY'
const TIMER_UP_STOP = 'TIMER_UP_STOP'
const READY_COUNT = 'READY_COUNT'
const TIMER_DOWN = 'TIMER_DOWN'
const DISPLAY = 'DISPLAY'
const TIMER_DOWN_STOP = 'TIMER_DOWN_STOP'


let initialState = {
    intervalSec: 0,
    intervalMin: 0,
    secNumTwo: 0,
    secNumOne: 0,
    minNumOne: 0,
    minNumTwo: 0,
    end: AudioEnd,
    tick: AudioTick,
    update: 'https://phoneky.co.uk/content/mp3tones/tone/2020/misc/preview/10e1ed805028501.mp3',
    sound: true,
    stopTimer: false,
    fullTime: 0
}

const timerReducer = (state = initialState, action) => {
    let soundEnd = new Audio(state.end)
    let soundTick = new Audio(state.tick)
    let soundUpdate = new Audio(state.update)
    let stateCopy = {...state}
    switch(action.type) {

        case READY_COUNT:
            stateCopy.stopTimer = action.readyCount
            return stateCopy

        case TIMER_UP:
            stateCopy.intervalSec = action.intervalSec
            stateCopy.intervalMin = action.intervalMin

            if (stateCopy.stopTimer === false) {
                if (stateCopy.secNumTwo < 9) {
                    stateCopy.secNumTwo++
                } else {
                    stateCopy.secNumTwo = 0
                    stateCopy.secNumOne++
                }
                if (stateCopy.secNumOne === 6 && stateCopy.secNumTwo === 0) {
                    stateCopy.secNumOne = 0
                    stateCopy.secNumTwo = 0

                    if (stateCopy.minNumTwo < 9) {
                        stateCopy.minNumTwo++
                    } else {
                        stateCopy.minNumTwo = 0
                        stateCopy.minNumOne++
                    }
                }
            }
            return stateCopy

        case TIMER_DOWN:
            stateCopy.intervalSec = action.intervalSec
            stateCopy.intervalMin = action.intervalMin
            stateCopy.fullTime = action.fullTime

            if (stateCopy.stopTimer === false) {

                if (action.seconds < 10) {
                    stateCopy.secNumOne = 0
                    stateCopy.secNumTwo = action.secArr.slice(0, 1).toString()
                } else {
                    stateCopy.secNumOne = action.secArr.slice(0, 1)
                    stateCopy.secNumTwo = action.secArr.slice(1)
                }
                if (action.minutes < 10) {
                    stateCopy.minNumOne = 0
                    stateCopy.minNumTwo = action.minArr.slice(0, 1)
                } else {
                    stateCopy.minNumOne = action.minArr.slice(0, 1)
                    stateCopy.minNumTwo = action.minArr.slice(1)
                }
                // soundTick.play()
            }
            return stateCopy

        case TIMER_UP_STOP:
            let sec = stateCopy.secNumOne + '' + stateCopy.secNumTwo
            let min = stateCopy.minNumOne + '' + stateCopy.minNumTwo

            if (sec === stateCopy.intervalSec && min === stateCopy.intervalMin || stateCopy.stopTimer) {
                clearInterval(action.timerUpStop)

                if (stateCopy.sound && stateCopy.stopTimer === false) {
                    soundEnd.play()
                }
            }
            return state

        case TIMER_DOWN_STOP:
            if (stateCopy.fullTime === 0 || stateCopy.stopTimer) {
                clearInterval(action.timerDownStop)
                if (stateCopy.sound && stateCopy.stopTimer === false) {
                    soundEnd.play()
                }
            }
            return stateCopy

        case DISPLAY:
            stateCopy.secNumOne = action.secNumOne
            stateCopy.secNumTwo = action.secNumTwo
            stateCopy.minNumOne = action.minNumOne
            stateCopy.minNumTwo = action.minNumTwo
            return stateCopy

        case SOUND:
            stateCopy.sound = action.off
            return stateCopy

        case UPDATE_TIMER:
            stateCopy.intervalMin = 0
            stateCopy.intervalSec = 0
            stateCopy.secNumOne = 0
            stateCopy.secNumTwo = 0
            stateCopy.minNumOne = 0
            stateCopy.minNumTwo = 0
            stateCopy.fullTime = 0
            stateCopy.stopTimer = true
            soundUpdate.play()
            return stateCopy

        default:
            return state
    }
}

export const updateAC = () => {
    return {type: UPDATE_TIMER}
}
export const soundAC = (off) => {
    return {type: SOUND, off: off}
}
export const timerUpAC = (intervalSec, intervalMin) => {
    return {type: TIMER_UP, intervalSec: intervalSec, intervalMin: intervalMin}
}
export const readyCountAC = (readyCount) => {
    return {type: READY_COUNT, readyCount: readyCount}
}
export const timerUpStopAC = (timerUpStop) => {
    return{type: TIMER_UP_STOP, timerUpStop: timerUpStop}
}
export const timerDownStopAC = (timerDownStop) => {
    return{type: TIMER_DOWN_STOP, timerDownStop: timerDownStop}
}
export const timerDownAC = (intervalSec, intervalMin, secNumOne, secNumTwo, minNumOne, minNumTwo, secArr, minArr,
                            minutes, seconds, fullTime) => {
    console.log('minutes', minutes)
    console.log('seconds', seconds)
    return {
        type: TIMER_DOWN,
        intervalSec: intervalSec,
        intervalMin: intervalMin,
        secNumOne: secNumOne,
        secNumTwo: secNumTwo,
        minNumOne: minNumOne,
        minNumTwo: minNumTwo,
        fullTime: fullTime,
        secArr: secArr,
        minArr: minArr,
        minutes: minutes,
        seconds: seconds
    }
}
export const displayAC = (secNumOne, secNumTwo, minNumOne, minNumTwo) => {
    return {type: DISPLAY, secNumOne: secNumOne, secNumTwo: secNumTwo, minNumOne: minNumOne, minNumTwo: minNumTwo}
}

export default timerReducer