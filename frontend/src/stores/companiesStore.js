import { observable, action } from 'mobx'

class CompaniesStore {

  @observable companiesList = []
  @action getCompanies = () => {

  }

}

export default new CompaniesStore()