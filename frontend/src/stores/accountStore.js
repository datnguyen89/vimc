import { observable, action } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import { toJS } from 'mobx'
import userStore from './userStore'

class AccountStore {
  @observable listAccounts = null;
  @observable userCode = null;
  @action setUserCode = (code) => {
    this.userCode = code;
  }
  @action getListAccounts = () => {
    if (userStore.token) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/accounts`,
          headers: {
            'Authorization': `Bearer ${userStore.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            user_code: this.userCode,
          },
        }).then(response => {
          if (response) {

            this.listAccounts = toJS(response)
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
  @action createAccount = (option) => {
    if (userStore.token) {

      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/accounts`,
          headers: {
            'Authorization': `Bearer ${userStore.token}`,
            'Content-Type': 'application/json',
          },
          data: option,
        }).then(response => {
          if (response) {
            message.success('Tạo mới account thành công')
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
  @action editAccount = (code, option) => {
    if (userStore.token) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/users/${code}`,
          headers: {
            'Authorization': `Bearer ${userStore.token}`,
            'Content-Type': 'application/json',
          },
          data: option,
        }).then(response => {
          if (response) {
            message.success('Chỉnh sửa Account thành công')
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
    if (userStore.token) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/users/${code}`,
          headers: {
            'Authorization': `Bearer ${userStore.token}`,
            'Content-Type': 'application/json',
          },
        }).then(response => {
          if (response) {
            message.success('Xóa Account thành công')
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

export default new AccountStore()