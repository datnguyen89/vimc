import { observable, action } from 'mobx'
import { message } from 'antd'
// Stores
import commonStore from './commonStore'
// Request
import { UserRequest } from '../requests'
import axios from 'axios'
import qs from 'querystring'
import { toJS } from 'mobx'

class UserStore {

  /** User info */
  @observable token = localStorage.getItem('jwt')
  @observable currentUser = null
  @observable ListUsers = null
  @observable ListAccounts = null

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

        this.setToken(response.data.access_token, true)

        resolve('success')
      }).catch(error => {
        console.log(error)
        reject('failed')
      })
    })
  }
  @action userLogout = () => {
    return new Promise(resolve => {
      this.currentUser = null
      this.clearToken()
      resolve()
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
            message.success('Welcome ' + response.data.username)
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
  @action getlistUsers = (pageIndex, pageSize) => {
    if (this.token) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/users`,
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            page: pageIndex,
            size: pageSize,
          },
        }).then(response => {
          if (response) {
            this.ListUsers = toJS(response)
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
  @action createUser = (option) => {
    if (this.token) {

      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/users`,
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          data: option,
        }).then(response => {
          if (response) {

            message.success('Tạo mới user thành công')
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
  @action editUser = (code, option) => {
    if (this.token) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/users/${code}`,
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          data: option,
        }).then(response => {
          if (response) {
            message.success('Chỉnh sửa User thành công')
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
  @action deleteUser = (code) => {
    if (this.token) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/users/${code}`,
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        }).then(response => {
          if (response) {
            message.success('Xóa User thành công')
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