import React, {useState, useRef} from 'react'
import classes from './SetsCard.css'
import TableSets from './TableSets'
import axios from 'axios'
import firebase from 'firebase/app';
import Button from "../../Button/Button";
import Input from '../../Inputs/Inputs'

const SetsCard = props => {
    const blockNameCard = useRef(null)
    const inputEditNameCard = useRef(null)
    const blockEditNameCard = useRef(null)
    const inputWeight = useRef(null)
    const inputRepetition = useRef(null)

    const [inputsValue, setInputsValue] = useState({
        weight: '',
        repetition: '',
    })

    const tableSets = props.sets.map((set, index) => <TableSets
        key={set.id}
        id={set.id}
        weight={set.weight}
        repetitions={set.repetitions}
        count={index + 1}
        tableHead={props.tableHead}
    />)

    let count = tableSets.map(count => count.props.count + 1)
    let countSets = count.push(1)

    // Открытие блока редактирования имени карты
    const editNameCard = (index) => {
        inputEditNameCard.current.classList.remove(classes.hide)
        blockNameCard.current.classList.add(classes.hide)
        blockEditNameCard.current.classList.remove(classes.hide)
        let nameCardItem = props.cards[index].nameCard
        inputEditNameCard.current.value = nameCardItem
        inputEditNameCard.current.focus()
    }

    // Редактирование имени карты
    const replacementNameCard = () => {
        let textName = inputEditNameCard.current.value
        props.replacementNameCard(textName)
    }

    // Обновление имени в state
    const updateNameCard = (index) => {
        if (props.replacementNameCard != '') {
            props.updateNameCard(index)
            blockEditNameCard.current.classList.add(classes.hide)
            blockNameCard.current.classList.remove(classes.hide)
        }
    }
    const database = firebase.database()
    const [latestData, setLatestData] = useState('')

    const [table, setTable] = useState(classes.hide)
    const showTable = () => {
        setInterval(() => {
            setTable('')
        }, 800)
    }

    let cardItem = []
    const saveData = (index, countSets) => {
        let obj = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            // date: new Date().toLocaleTimeString().slice(0, -3),
            partBody: props.partBody,
            nameCard: props.nameCard,
            sets: props.sets
        }
        if (inputsValue.weight === '') {
            setInputsValue({...inputsValue, styleInputWeight: true})
        } else if (inputsValue.repetition === '') {
            setInputsValue({...inputsValue, styleInputRepetition: true})
        } else {
            props.saveData(index, countSets, inputsValue.weight, inputsValue.repetition)
            setInputsValue({...inputsValue, weight: '', repetition: '' })
            inputWeight.current.value = ''
            inputRepetition.current.value = ''
            cardItem.push(obj)
            showTable()
            if (latestData === '') {
                axios.post('https://fitness-journal-3b09f-default-rtdb.firebaseio.com/' + props.localId + '/cardItem.json', cardItem)
            } else {
                let setItem = [...props.sets].pop()
                let lastIndex = setItem.countSets - 1
                database.ref(props.localId + '/cardItem/' + latestData + '/0/sets/' + lastIndex).set(setItem)
            }
            const cards = database.ref(props.localId + '/cardItem')
            // Динамическое получение последних данных из БД
            cards.on('value', (elem) => {
                setLatestData(Object.keys(elem.val()).pop())
            })
        }
    }

    return (
        <div className={classes.SetsCard}>
            <div className={classes.gymnasticBlock}>
                <div className={classes.blockData}>
                    <div ref={blockNameCard} className={classes.headerCard}>
                        <div className={classes.titleCard}>{props.nameCard}</div>
                        <div onClick={() => editNameCard(props.index)} className={classes.iconEdit}>&#9999;</div>
                    </div>
                    <div ref={blockEditNameCard} className={classes.wrapperEditTitle + ' ' + classes.hide}>
                        <input ref={inputEditNameCard} className={classes.inputEditNameCard}
                               onChange={replacementNameCard}/>
                        <i onClick={() => updateNameCard(props.index)} className='far fa-save'></i>
                    </div>
                    <div className={classes.inputsStart}>
                        <div className={classes.inputWeight}>
                            <div className={classes.label}>Вес нагрузки (кг.гр.)</div>

                            <Input
                                ref={inputWeight}
                                type="number"
                                onChange={(e) => setInputsValue({
                                    ...inputsValue, weight: e.target.value, styleInputWeight: false
                                })}
                                styleInput={inputsValue.styleInputWeight}
                            />
                        </div>
                        <div className={classes.repetition}>
                            <div className={classes.label}>Число повторений</div>

                            <Input
                                ref={inputRepetition}
                                onChange={(e) => setInputsValue({
                                    ...inputsValue, repetition: e.target.value, styleInputRepetition: false
                                })}
                                type='number'
                                styleInput={inputsValue.styleInputRepetition}
                            />
                        </div>
                    </div>
                    <table className={table}>
                        {props.tableHead
                            ?
                            <thead>
                            <tr>
                                <td>Подход №</td>
                                <td>Вес нагрузки, кг.</td>
                                <td>Число повторений</td>
                            </tr>
                            </thead>
                            :
                            null
                        }
                        {tableSets}
                    </table>
                </div>
                <div className={classes.blockBtn}>
                    <Button onClick={() => saveData(props.index, countSets)}
                            text='сохранить результаты'
                    />
                </div>
            </div>
        </div>
    )
}
export default SetsCard

