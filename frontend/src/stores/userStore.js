import {observable, action} from 'mobx'
import {message} from 'antd'
// Stores
import commonStore from './commonStore'
// Request
import {UserRequest} from '../requests'
import axios from 'axios'
import qs from 'querystring'


class UserStore {

    /** User info */
    @observable token = localStorage.getItem('jwt')
    @observable currentUser = {}

    /** User action */
    @action setToken = (token, remember) => {
        this.token = token
        if (remember) {
            localStorage.setItem('jwt', token)
        } else {
            sessionStorage.setItem('jwt', token)
        }
    }
    @action clearToken = () => {
        this.token = ''
        localStorage.clear()
        sessionStorage.clear()
    }
    @action userRegister = (username, email, password) => {
        return new Promise((resolve, reject) => {
            UserRequest.userRegister(username, email, password)
                .then(response => {
                    message.success(`Account register successfully`)
                    resolve(response)
                })
                .catch(error => {
                    message.error(error.response.data.message)
                    reject(error)
                })
        })
    }

    @action userLogin = (identifier, password, remember) => {
        const token = Buffer.from(`${'vimc'}:${'03BaArGhaTpR$3vm%KC2BPV5J69$p@'}`, 'utf8').toString('base64')
        const requestBody = {
            username: identifier,
            password: password,
            grant_type: 'password',
            scope: 'openid'
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'http://oauth.vimc-portal.corlogy.com/api/v1/oauth/token',
                data: qs.stringify(requestBody),
                headers: {
                    'Authorization': `Basic ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then(response => {
                console.log(response);
                this.currentUser = {username: identifier, password: password,};
                this.setToken(response.data.access_token,false);
                resolve(response);
                message.success("Welcome " + identifier) ;
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
    @action userLogout = () => {
        return new Promise(resolve => {
            this.currentUser = {}
            this.clearToken()
            commonStore.setTheme('green')
            resolve()
        })
    }
    @action updateUserInfo = (userId, info) => {
        return new Promise((resolve, reject) => {
            UserRequest.updateUserInfo(userId, info)
                .then(response => {
                    this.currentUser = response.data
                    resolve(response)
                })
                .catch(error => {
                    message.error(error.response.data.message)
                    reject(error)
                })
        })
    }
    @action sendResetPassword = email => {
        return new Promise((resolve, reject) => {
            UserRequest.sendResetPassword(email)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    message.error(error.response.data.message)
                    reject(error)
                })
        })
    }
    @action userSetNewPassword = (code, password, passwordConfirmation) => {
        return new Promise((resolve, reject) => {
            UserRequest.userSetNewPassword(code, password, passwordConfirmation)
                .then(response => {
                    message.success(`Your password has been changed successfully`)
                    resolve(response)
                })
                .catch(error => {
                    message.error(error.response.data.message)
                    reject(error)
                })
        })
    }
    @action checkCurrentUser = () => {
        if (this.token) {
            return new Promise((resolve, reject) => {
                UserRequest.checkCurrentUser()
                    .then(response => {
                        this.currentUser = response.data
                        commonStore.setTheme(response.data.theme)
                        resolve(response)
                    })
                    .catch(error => {
                        message.error(error.response.data.message)
                        reject(error)
                    })
            })
        }
    }
}

export default new UserStore()
