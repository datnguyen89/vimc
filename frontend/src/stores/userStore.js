import { observable, action } from 'mobx'
import { message } from 'antd'
// Stores
import commonStore from './commonStore'
// Request
import { UserRequest } from '../requests'
import axios from 'axios'
import qs from 'querystring'


class UserStore {

  /** User info */
  @observable token = localStorage.getItem('jwt')
  @observable currentUser = localStorage.getItem('user')

  /** User action */
  @action setToken = (token, remember) => {
    this.token = token
    localStorage.setItem('jwt', token)
    // if (remember) {
    //   localStorage.setItem('jwt', token)
    // } else {
    //   sessionStorage.setItem('jwt', token)
    // }
  }
  @action setCurrentUser = (identifier) => {
    this.currentUser = identifier
    localStorage.setItem('user', identifier)
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
      scope: 'openid',
    }

    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: process.env.REACT_APP_VIMC_URL,
        data: qs.stringify(requestBody),
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(response => {
        console.log(response.data)
        this.setToken(response.data.access_token, true)
        message.success('Welcome ' + identifier)
        resolve('success')
      }).catch(error => {
        console.log(error)
        reject('failed')
      })
    })
  }
  @action userLogout = () => {
    return new Promise(resolve => {
      this.currentUser = {}
      this.clearToken()
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
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/users/user-info`,
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(response => {
          if (response.data) {
            this.setCurrentUser(response.data.username)
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}

export default new UserStore()
