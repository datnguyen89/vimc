import { observable, action } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import qs from 'querystring'
import { toJS } from 'mobx'
import userStore from './userStore'

class CommandStore {

  @observable ListCommands = []
  // @action setListCommands = (list) => {
  //   this.ListCommands = list
  // }

  @action getListCommands = () => {
    if (userStore.token) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/commands`,
          headers: {
            'Authorization': `Bearer ${userStore.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },

        }).then(response => {
          if (response) {
            this.ListCommands = toJS(response)
            // this.setListCommands(toJS(response))
            console.log(toJS(response))
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

export default new CommandStore()