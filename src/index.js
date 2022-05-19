import React from 'react';
import store from './Redux/Store/redux-store'
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import firebase from "firebase/app";
import 'firebase/database';
import './index.css';

const firebaseConfig = {
    apiKey: "AIzaSyDBu5JcBqqz_at37zzPY1CHNMXRx_xalXc",
    authDomain: "fitness-journal-3b09f.firebaseapp.com",
    databaseURL: "https://fitness-journal-3b09f-default-rtdb.firebaseio.com",
    projectId: "fitness-journal-3b09f",
    storageBucket: "fitness-journal-3b09f.appspot.com",
    messagingSenderId: "97974296568",
    appId: "1:97974296568:web:b7b82e9f1764bfbea4800d"
};

firebase.initializeApp(firebaseConfig)
console.log('store >>>', store)
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root')
)




