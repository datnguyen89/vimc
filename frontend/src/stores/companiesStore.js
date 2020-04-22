import { observable, action } from 'mobx'
import userStore from './userStore'
import axios from 'axios'

class CompaniesStore {

  @observable listCompany = []
  @action setListCompany = (list) => {
    this.listCompany = list
  }
  @action getListCompany = () => {
    if (userStore.token) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_VIMC_BUSINESS}/api/v1/companies`,
          headers: {
            'Authorization': `Bearer ${userStore.token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            status: true,
          },
        }).then((response) => {
          if (response) {
            this.setListCompany(response.data)
            resolve(response)
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }

}

export default new CompaniesStore()