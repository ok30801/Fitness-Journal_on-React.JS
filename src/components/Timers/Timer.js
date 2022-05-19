import React, {useState, useRef} from "react";
import classes from './Timer.css'
import NavBar from "../Navigation/NavBar/NavBar";
import Time from "../Time/Time";
import NavTabs from "../Navigation/NavTabs/NavTabs";
import Button from "../Button/Button";
import Input from '../Inputs/Inputs'
import cn from 'classnames'

const Timer = props => {
    const inputSec = useRef(null)
    const inputMin = useRef(null)
    const [volumeToggle, setVolumeToggle] = useState(true)
    const [inputsValue, setInputsValue] = useState({
        sec: '',
        min: '',
        readyCount: true
    })

    const [disabledButton, setDisabledButton] = useState(false)
    const [styleClickUpdate, setStyleClickUpdate] = useState(false)
    const [displaySec, setDisplaySec] = useState({
        secNumOne: 0,
        secNumTwo: 0,
    })
    const [displayMin, setDisplayMin] = useState({
        minNumOne: 0,
        minNumTwo: 0,
    })

    let intervalSec = 0
    let intervalMin = 0

    const timerUp = () => {

        if (inputsValue.min === '') {
            setInputsValue({...inputsValue, styleInputMin: true})
        } else if (inputsValue.sec === '') {
            setInputsValue({...inputsValue, styleInputSec: true})
        } else {
            setDisabledButton(true)
            inputsValue.sec < 10
                ? intervalSec = 0 + '' + inputsValue.sec
                : intervalSec = inputsValue.sec

            inputsValue.min < 10
                ? intervalMin = 0 + '' + inputsValue.min
                : intervalMin = inputsValue.min

            props.timerUp(intervalSec, intervalMin, inputsValue.readyCount)
        }
    }
    let secNumOne = 0
    let secNumTwo = 0
    let minNumOne = 0
    let minNumTwo = 0

    const timerDown = () => {

        if (inputsValue.min === '') {
            setInputsValue({...inputsValue, styleInputMin: true})
        } else if (inputsValue.sec === '') {
            setInputsValue({...inputsValue, styleInputSec: true})
        } else {
            setDisabledButton(true)
            if (inputsValue.sec < 10) {
                intervalSec = 0 + '' + inputsValue.sec
                secNumTwo = inputsValue.sec
            } else {
                intervalSec = inputsValue.sec
                secNumOne = inputsValue.sec.slice(0, 1)
                secNumTwo = inputsValue.sec.slice(1)
            }

            if (inputsValue.min < 10) {
                intervalMin = 0 + '' + inputsValue.min
                minNumTwo = inputsValue.min
            } else {
                intervalMin = inputsValue.min
                minNumOne = inputsValue.min.slice(0, 1)
                minNumTwo = inputsValue.min.slice(1)
            }
        }
        let fullTime = (minNumOne + minNumTwo) * 60 + +intervalSec

        console.log('fullTime', fullTime)

        props.timerDown(intervalSec, intervalMin, inputsValue.readyCount, secNumOne, secNumTwo, minNumOne, minNumTwo, fullTime)
    }

    const soundToggle = () => {
        setVolumeToggle(!volumeToggle)
        props.sound(!volumeToggle)
    }

    const update = () => {
        inputSec.current.value = ''
        inputMin.current.value = ''
        setInputsValue({...inputsValue, min: '', sec: ''})
        props.update(inputsValue.sec, inputsValue.min)
        setDisabledButton(false)
        setStyleClickUpdate(!styleClickUpdate)
        setDisplaySec({
            ...displaySec, secNumOne: 0, secNumTwo: 0,
        })
        setDisplayMin({
            ...displayMin, minNumOne: 0, minNumTwo: 0
        })
        setInputsValue({...inputsValue, min: '', sec: '',  readyCount: true})
    }

    return (
        <div className={classes.wrapper}>
            <NavBar link={props.menuTimer}/>
            <Time/>
            <div className={classes.wrapper}>
                <div>
                    <NavTabs/>
                    <div className={classes.container}>
                        <div className={classes.bg}></div>
                        <article>
                            <div className={classes.volumeBlock}>

                                <div onClick={soundToggle} className={classes.volumeIcon}>
                                    {
                                        volumeToggle
                                            ? <i className="fas fa-volume-up"></i>
                                            : <i className="icon-volumeOff"></i>
                                    }
                                </div>

                            </div>
                            <div className={classes.timer}>
                                <div className={classes.displayTime}>
                                    {props.minNumOne}{props.minNumTwo}
                                    &nbsp;:&nbsp;
                                    {props.secNumOne}{props.secNumTwo}
                                </div>
                            </div>
                            <div className={classes.timerBlockBg}></div>
                            <div className={classes.timerBlock}>

                                <Input
                                    ref={inputMin}
                                    type="number"
                                    onChange={(e) => setInputsValue({
                                        ...inputsValue, min: e.target.value,
                                        styleInputMin: false,
                                    })}
                                    placeholder="мин."
                                    styleInput={inputsValue.styleInputMin}
                                    timerUp={timerUp}
                                />

                                <span>:</span>

                                <Input
                                    ref={inputSec}
                                    type="number"
                                    onChange={(e) => setInputsValue({
                                        ...inputsValue, sec: e.target.value,
                                        styleInputSec: false,
                                        readyCount: false
                                    })}
                                    placeholder="сек."
                                    styleInput={inputsValue.styleInputSec}
                                />

                            </div>
                            <div className={classes.blockBtn}>
                                <Button
                                    text='счет'
                                    i={<i className="fa fa-chevron-up"></i>}
                                    onClick={timerUp}
                                    disabled={disabledButton}
                                />

                                <span onClick={update} className={cn(classes.update, {
                                    [classes.rotate]: styleClickUpdate
                                })}>
                                <i className="fas fa-sync-alt"></i>
                            </span>

                                <Button
                                    text='счет'
                                    i={<i className="fa fa-chevron-down"></i>}
                                    onClick={timerDown}
                                    disabled={disabledButton}
                                />
                            </div>
                        </article>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Timer

