import React from 'react'
import Layout from './hoc/Layout/Layout'
import Auth from './components/Auth/Auth'
import AerobicsContainer from "./components/Aerobics/AerobicsContainer";
import PowerContainer from "./components/Power/PowerContainer";
import HistoryContainer from "./components/History/HistoryContainer";
import TimerContainer from "./components/Timers/TimerContainer";
import {Route} from 'react-router-dom'

const App = props => {
    return (
      <Layout>
        <Route path="/" exact render={() => <Auth/>} />
        <Route path="/aerobics" render={() => <AerobicsContainer store={props.store}/>} />
        <Route path='/power' render={() => <PowerContainer store={props.store}/>} />
        <Route path='/history' render={() => <HistoryContainer store={props.store}/>} />
        <Route path='/timer' render={() => <TimerContainer store={props.store}/>} />
      </Layout>
    )
}

export default App
