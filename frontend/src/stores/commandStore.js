import { observable, action } from 'mobx'
import axios from 'axios'
import userStore from './userStore'

class CommandStore {

  @observable ListCommands = []

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
            this.ListCommands = response.data
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