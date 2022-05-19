const SAVE_DATA = 'SAVE_DATA'
const CREATE_CARD = 'CREATE_CARD'
const UPDATE_NAME_CARD = 'UPDATE_NAME_CARD'
const REPLACEMENT_NAME_CARD = 'REPLACEMENT_NAME_CARD'
const UPDATE = 'UPDATE'

let initialState = {
    count: 0,
    cards: [],
    replacementNameCardAdvance: '',
    tableHead: false,
    menuPower: '/power',
    menuHistory: '/history',
    menuTimer: '/timer',
}

const powerReducer = (state= initialState, action) => {

    let stateCopy = {...state}
    switch(action.type) {
        case CREATE_CARD: {
            stateCopy.cards = [...state.cards]
            let card = {
                id: Date.now(),
                nameCard: action.name,
                partBody: action.partBody,
                sets: []
            }
            stateCopy.cards.push(card)
            return stateCopy
        }
        case REPLACEMENT_NAME_CARD: {
            stateCopy.replacementNameCardAdvance = action.replacementNameCard
            return stateCopy
        }
        case UPDATE_NAME_CARD: {
            stateCopy.cards = [...state.cards]
            stateCopy.cards[action.updateNameCard].nameCard = stateCopy.replacementNameCardAdvance
            stateCopy.replacementNameCardAdvance = '' // обнуление инпута
            return stateCopy
        }
        case SAVE_DATA: {
            let setItem = {
                id: Date.now(),
                countSets: action.countSets,
                weight: action.weight,
                repetitions: action.repetition
            }
            stateCopy.cards[action.index].sets.push(setItem)
            stateCopy.tableHead = true
            return stateCopy
        }
        case UPDATE: {
            stateCopy.cards = []
            return stateCopy
        }
        default:
            return state
    }
}

export const createCardAC = (name, partBody) => {
    return {type: CREATE_CARD, name: name, partBody: partBody}
}
export const replacementNameCardAC = (textName) => {
    return {type: REPLACEMENT_NAME_CARD, replacementNameCard: textName}
}
export const updateNameCardAC = (index) => {
    return {type: UPDATE_NAME_CARD, updateNameCard: index}
}
export const updateAC = () => {
    return {type: UPDATE}
}
export const saveDataAC = (index, countSets, weight, repetition) => {
    return {type: SAVE_DATA, index: index, countSets: countSets, weight: weight, repetition: repetition}
}

export default powerReducer