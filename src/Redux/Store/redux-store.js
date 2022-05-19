import {combineReducers, createStore} from "redux";
import timerReducer from "../Reducers/timer-reducers";
import powerReducer from "../Reducers/power-reducers";

let reducers = combineReducers({
    timer: timerReducer,
    power: powerReducer,
})

let store = createStore(reducers)

export default store