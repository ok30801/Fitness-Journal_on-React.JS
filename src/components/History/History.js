import React, {useState, useEffect} from 'react'
import NavBar from '../Navigation/NavBar/NavBar'
import NavTabs from "../Navigation/NavTabs/NavTabs";
import HistorySets from "./Sets/HistorySets"
import Time from '../Time/Time'
import axios from 'axios'
import Loader from './Loader/Loader'
import Index from './Pagination'
import classes from './History.css'

const History = (props) => {

    const localId = JSON.parse(localStorage.getItem('userData')).map(item => item.localId).toString()
    const nickNameDef = JSON.parse(localStorage.getItem('userData')).map(item => item.nickName).toString()
    const nickNameFirstLetter = nickNameDef.slice(0,1).toUpperCase()
    const nickName = nickNameFirstLetter + nickNameDef.slice(1)

    const [alertMessage, setAlertMessage] = useState({
        alertMessage: '',
        hide: ''
    })
    const [setPanelDate, changePanelDate] = useState({
        activePanelDate: null,
        date: [],
    })
    const [blockSets, setBlockSets] = useState({
        activeSetsDate: null,
        allCards: [],
        filterSetsDate: [],
        workoutDateKeys: [],
        cardItemKeys: [],
    })

    console.table('blockSetsTable', blockSets)
    console.log('blockSets', blockSets)

    useEffect(() => {
        try {
            let fetchData = async () => {

                await axios.get('https://fitness-journal-3b09f-default-rtdb.firebaseio.com/' + localId + '/workoutDate.json').then(responce => {
                    console.log('responce.data_workoutDate >>', responce.data)
                    if (responce.data !== null) {
                        Object.keys(responce.data).map(key => {
                            blockSets.workoutDateKeys.push(key)
                        })
                        Object.values(responce.data).forEach(date => {
                            date.map(item => {
                                setPanelDate.date.unshift(item)
                            })
                        })
                    }
                })
                await axios.get('https://fitness-journal-3b09f-default-rtdb.firebaseio.com/' + localId + '/cardItem.json').then(responce => {
                    console.log('responce.data_cardItem', responce.data)
                    if (responce.data !== null) {
                        Object.keys(responce.data).map(key => {
                            blockSets.cardItemKeys.push(key)
                        })
                        Object.values(responce.data).map(set => {
                            set.map(item => {
                                blockSets.allCards.unshift(item)
                            })
                        })
                        setPanelDate.date.map(date => {
                            blockSets.filterSetsDate.push(blockSets.allCards.filter(card => card.date === date.date))
                        })

                        setAlertMessage({
                            alertMessage: '',
                            hide: ''
                        })
                    } else {
                        setAlertMessage({
                            alertMessage: <article className={classes.alertMessage}>
                                <div className={classes.nickName}>{nickName}</div>
                                <div className={classes.smile}>
                                    <i className="fa fa-frown-o" aria-hidden="true"></i>
                                </div>
                                <div className={classes.message}>у вас пока нет историитренировок</div>
                            </article>,
                            hide: classes.hide
                        })
                    }
                })
            }
            fetchData()
        } catch (e) {
            console.log(e)
        }
    }, [changePanelDate])

    const toggleActive = (index) => {
        changePanelDate({...setPanelDate, activePanelDate: setPanelDate.date[index]})
        setBlockSets({...blockSets, activeSetsDate: blockSets.filterSetsDate[index]})
    }
    const toggleActiveStyle = (index) => {
        if (blockSets.filterSetsDate[index] === '') {
            return classes.hide
        }
        if (setPanelDate.date[index] === setPanelDate.activePanelDate) {
            return classes.accordionItem + ' ' + classes.active
        } else {
            return classes.accordionItem
        }
    }
    const showSets = (index) => {
        if (blockSets.filterSetsDate[index] === blockSets.activeSetsDate) {
            return classes.historyItem
        } else {
            return classes.historyItem + ' ' + classes.hide
        }
    }
    
    const [setPagination, setStatePagination] = useState({
        currentPage: 1,
        pageSize: 5
    })
    let pageNumber = []
    const activeBtnPagination = (index) => {
        setStatePagination({...setPagination, currentPage: pageNumber[index]})
    }
    const indexOfLastDate = setPagination.currentPage * setPagination.pageSize
    const indexOfFirstDate = indexOfLastDate - setPagination.pageSize
    const currentDate = setPanelDate.date.slice(indexOfFirstDate, indexOfLastDate)
    const group = blockSets.filterSetsDate.map(item => item.map(part => part.partBody))
    const uniquePartBody = group.map(item => Array.from(new Set(item))) // возвращает уникальные элементы массива
    const currentPartBody = uniquePartBody.slice(indexOfFirstDate, indexOfLastDate)
    let countBtnPagination = Math.ceil(setPanelDate.date.length / setPagination.pageSize)
    for (let i = 1; i <= countBtnPagination; i++) {
        pageNumber.push(i)
    }
    const startBtnPagination = () => {
        alert('Start')
    }
    const endBtnPagination = () => {
        alert('End')
    }

    return (
        <div className={classes.wrapper}>
            <NavBar link={props.menuHistory}/>
            <Time/>
            <NavTabs/>
            <div className={classes.historyBlocks}>
                {
                    blockSets.allCards != ''
                        ?
                        currentDate.map((date, index) => (
                            <div key={date.id} className={classes.blockItem}>
                                <div className={toggleActiveStyle(index)} key={index}
                                     onClick={() => toggleActive(index)}>
                                    <span className={classes.date}>{date.date}</span>
                                    <span
                                        className={classes.partBody}>Мышцы - {currentPartBody[index].map(item => item.slice(5)).join(',')}</span>
                                    <span className={classes.triangle}></span>
                                </div>
                                <div className={showSets(index)}>
                                    {
                                        blockSets.allCards.filter(card => card.date === date.date).map((filter, index) => (
                                            <HistorySets key={filter.id}
                                                         nameCard={filter.nameCard}
                                                         date={filter.date}
                                                         filter={filter}
                                                         index={index}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                        : <Loader hide={alertMessage.hide}/>
                }
                {alertMessage.alertMessage}
                <Index
                    setPanelDate={setPanelDate}
                    setPagination={setPagination}
                    activeBtnPagination={activeBtnPagination}
                    pageNumber={pageNumber}
                    startBtnPagination={startBtnPagination}
                    endBtnPagination={endBtnPagination}
                />
            </div>
        </div>
    )
}

export default History

