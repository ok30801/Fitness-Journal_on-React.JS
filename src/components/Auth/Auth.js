import React, {useState, useRef} from 'react'
import classes from './Auth.css'
import {NavLink} from "react-router-dom";
import axios from 'axios'
import AssignmentIcon from '@material-ui/icons/Assignment';
import validatePassword from "./ValidatePassword";
import validateEmail from "./ValidateEmail";
import Swal from 'sweetalert2'
import power from "../../assets/img/power.jpg";
import LinkSharpIcon from "@material-ui/icons/LinkSharp";
import aerobics from "../../assets/img/aerobics.jpg";
import Button from "../Button/Button";

const Auth = props => {

    const inputEmail = useRef()
    const inputPassword = useRef()
    const [emailData, setEmailData] = useState({
        email: {
            value: ''
        }
    })
    const [passwordData, setPasswordData] = useState({
        password: {
            value: ''
        }
    })
    const [styleInputEmail, setStyleInputEmail] = useState({
        on: false,
        vibration: '',
        borderColorEmail: ''
    })
    const [styleInputPassword, setStyleInputPassword] = useState({
        on: false,
        vibration: '',
        borderColorPassword: ''
    })
    const [hideAuthForm, setHideAuthForm] = useState('')
    const [styleTrainingBlock, setStyleTrainingBlock] = useState({
        hide: classes.hideTrainingType,
        show: ''
    })
    const handleChangeEmail = () => {
        setEmailData({
            email: {
                value: inputEmail.current.value
            }
        })
    }
    const handleChangePassword = () => {
        setPasswordData({
            password: {
                value: inputPassword.current.value
            }
        })
    }

    const loginHandler = async (e) => {
        const userData = []
        e.preventDefault()
        const authData = {
            email: emailData.email.value,
            password: passwordData.password.value,
            returnSecureToken: true
        }
        try {
            if (emailData.email.value === '' || validateEmail(emailData.email.value)) {
                inputEmail.current.focus()
                setStyleInputEmail({...styleInputEmail, borderColorEmail: classes.borderColorEmail})
                Swal.fire({
                    icon: 'warning',
                    title: validateEmail(emailData.email.value),
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            } else if (passwordData.password.value === '' || validatePassword(passwordData.password.value)) {
                inputPassword.current.focus()
                setStyleInputPassword({...styleInputPassword, borderColorPassword: classes.borderColorPassword})
                Swal.fire({
                    icon: 'warning',
                    title: validatePassword(passwordData.password.value),
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            } else {
                const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBu5JcBqqz_at37zzPY1CHNMXRx_xalXc', authData)
                console.log('response.data', response.data)
                const nickName = response.data.email.split('@').shift()
                let obj = {
                    localId: response.data.localId,
                    nickName: nickName
                }
                userData.push(obj)
                setHideAuthForm(classes.hideForm)
                setStyleTrainingBlock({...styleTrainingBlock, hide: '', show: classes.showTrainingType})
                localStorage.setItem('userData', JSON.stringify(userData))
            }
        } catch (e) {
            if (e) {
                Swal.fire({
                    icon: 'warning',
                    title: `Пользователь не найден.<br> Пройдите регистрацию!`,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            }
        }
    }
    const registerHandler = async (e) => {
        const userData = []
        e.preventDefault()
        const authData = {
            email: emailData.email.value,
            password: passwordData.password.value,
            returnSecureToken: true
        }
        try {
            if (emailData.email.value === '' || validateEmail(emailData.email.value)) {
                inputEmail.current.focus()
                setStyleInputEmail({...styleInputEmail, borderColorEmail: classes.borderColorEmail})
                Swal.fire({
                    icon: 'warning',
                    title: validateEmail(emailData.email.value),
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            } else if (passwordData.password.value === '' || validatePassword(passwordData.password.value)) {
                inputPassword.current.focus()
                setStyleInputPassword({...styleInputPassword, borderColorPassword: classes.borderColorPassword})
                Swal.fire({
                    icon: 'warning',
                    title: validatePassword(passwordData.password.value),
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })

            } else {
                const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBu5JcBqqz_at37zzPY1CHNMXRx_xalXc', authData)
                const nickName = response.data.email.split('@').shift().toString()
                let obj = {
                    localId: response.data.localId,
                    nickName: nickName
                }
                userData.push(obj)
                setHideAuthForm(classes.hideForm)
                setStyleTrainingBlock({...styleTrainingBlock, hide: '', show: classes.showTrainingType})
                localStorage.setItem('userData', JSON.stringify(userData))
            }
        } catch (e) {
            inputEmail.current.focus()
            inputEmail.current.value = ''
            Swal.fire({
                icon: 'warning',
                title: 'Пользователь с таким email уже существует',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }
    }
    return (
        <header className={classes.Auth}>
            <form className={classes.authForm + ' ' + hideAuthForm}>
                <h1><AssignmentIcon/> Дневник тренировок</h1>
                <input ref={inputEmail}
                       onChange={handleChangeEmail}
                       className={styleInputEmail.borderColorEmail + ' ' + styleInputEmail.vibration}
                       type="email" placeholder="Email"
                />
                <input ref={inputPassword}
                       onChange={handleChangePassword}
                       className={styleInputPassword.borderColorPassword + ' ' + styleInputPassword.vibration}
                       type="password"
                       placeholder="Пароль"
                       pattern='[a-zA-Z]'
                />
                <div className={classes.buttons}>
                    <Button onClick={loginHandler} text='Вход'/>
                    <Button onClick={registerHandler} text='Регистрация'/>
                </div>
            </form>

            <div className={classes.trainingType + ' ' + styleTrainingBlock.hide + ' ' + styleTrainingBlock.show}>
                <section></section>
                <div className={classes.blockTypeTraining}>
                    <h1>Выберите тип тренировки</h1>
                    <div className={classes.typeTraining}>
                        <div className={classes.slide}>
                            <img src={power}/>
                            <NavLink to="/power" className={classes.power}>
                                <div>Силовая <LinkSharpIcon/></div>
                            </NavLink>
                        </div>

                        <div className={classes.slide}>
                            <img src={aerobics}/>
                            <div to="/power" className={classes.power}>
                                <div>Аэробная <LinkSharpIcon/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Auth
