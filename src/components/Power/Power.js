import React, {useEffect, useState} from "react";
import classes from './Power.css'
import SetsCard from "./Sets Card/SetsCard";
import NavBar from "../Navigation/NavBar/NavBar";
import Time from "../Time/Time";
import NavTabs from "../Navigation/NavTabs/NavTabs";
import axios from 'axios'
import Button from "../Button/Button";
import Input from '../Inputs/Inputs'
import Select from "../Select/Select";

const Power = props => {
    const localId = JSON.parse(localStorage.getItem('userData')).map(item => item.localId).toString()
    const inputNameCard = React.createRef()
    const partBodySelect = React.createRef()
    const [toggleHideBtnAddCard, setToggleHideBtnAddCard] = useState('')
    const [toggleHideAddNameCard, setToggleHideAddNameCard] = useState(classes.hide)
    const [inputValue, setInputValue] = useState({
        name: '',
    })

    const [selectPartBody, setSelectPartBody] = useState({
        partBody: '',
    })

    const update = () => {
        props.update()
    }

    useEffect(() => {
        update()
    }, [])

    let setsNameCard = props.cards.map((card, index) => <SetsCard
        key={card.id}
        id={card.id}
        nameCard={card.nameCard}
        partBody={card.partBody}
        cards={props.cards}
        sets={card.sets}
        tableHead={props.tableHead}
        updateNameCard={props.updateNameCard}
        replacementNameCard={props.replacementNameCard}
        saveData={props.saveData}
        index={index}
        localId={localId}
    />)

    const addNewCard = () => {
        setToggleHideAddNameCard(' ')
        setToggleHideBtnAddCard(classes.hide)
    }

    let workoutDate = []
    useEffect(() => {
        try {
            let allTimes = async () => {

                await axios.get('https://fitness-journal-3b09f-default-rtdb.firebaseio.com/' + localId + '/workoutDate.json').then(responce => {

                    if (responce.data == null ||
                        Object.values(responce.data).pop().map(item => item.date) != new Date().toLocaleDateString()) {
                        // Object.values(responce.data).pop().map(item => item.date) != new Date().toLocaleTimeString().slice(0, -3)) {
                        workoutDate.push({
                            id: Date.now(),
                            date: new Date().toLocaleDateString(),
                            // date: new Date().toLocaleTimeString().slice(0, -3),
                        })
                    }
                })
            }
            allTimes()
        } catch (e) {
            console.log(e)
        }
    })


    const createCard = () => {
        if (selectPartBody.partBody === '') {
            setSelectPartBody({...selectPartBody, styleSelect: true})
        } else if (inputValue.name === '') {
            setInputValue({...inputValue, styleInputName: true})
        } else {
            props.createCard(inputValue.name, selectPartBody.partBody)
            setToggleHideAddNameCard(classes.hide)

            inputNameCard.current.value = ''
            partBodySelect.current.value = 'Выберите группу мышц'
            try {
                axios.post('https://fitness-journal-3b09f-default-rtdb.firebaseio.com/' + localId + '/workoutDate.json', workoutDate)
                workoutDate = []
            } catch (e) {
                console.log(e)
            }
            setToggleHideBtnAddCard(' ')
        }
    }

    return (
        <div className={classes.wrapper}>
            <NavBar link={props.menuPower}/>
            <Time/>
            <div className={classes.Power}>
                <NavTabs/>
                {setsNameCard}
                <div className={classes.bg + ' ' + toggleHideAddNameCard}>
                    <div className={classes.createGymnasticBlock + ' ' + toggleHideAddNameCard}>
                        <Select
                            ref={partBodySelect}
                            onChange={(e) => setSelectPartBody({
                                ...selectPartBody, partBody: e.target.value, styleSelect: false
                            })}
                            styleSelect={selectPartBody.styleSelect}
                        >
                            <option>Выберите группу мышц</option>
                            <option value="Мышцы груди">Мышцы груди</option>
                            <option value="Мышцы рук">Мышцы рук</option>
                            <option value="Мышцы ног">Мышцы ног</option>
                            <option value="Мышцы пресса">Мышцы пресса</option>
                            <option value="Мышцы спины">Мышцы спины</option>
                        </Select>

                        <Input
                            ref={inputNameCard}
                            placeholder="Укажите название упражнения"
                            onChange={(e) => setInputValue({
                                ...inputValue, name: e.target.value, styleInputName: false
                            })}
                            styleInput={inputValue.styleInputName}
                        />
                        <Button onClick={createCard} text='сохранить' i={<i className='far fa-save'></i>}/>
                    </div>
                </div>
                <button className={classes.addCard + ' ' + toggleHideBtnAddCard} onClick={addNewCard}>+</button>
            </div>
        </div>
    )
}

export default Power










