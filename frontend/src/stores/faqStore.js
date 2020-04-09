import { observable, action } from 'mobx'
import { message } from 'antd'
// Request
import { FAQRequest } from '../requests'

class FAQStore {

  /**
   *  Mock FAQ data
   *
   * */
  @observable faqList = []
  @action getFAQData = () => {
    return new Promise((resolve, reject) => {
      FAQRequest.getFAQData()
        .then(response => {
          resolve(response)
          this.faqList = response.data
        })
        .catch(error => {
          message.error(error.response.data.message)
          reject(error)
        })
    })
  }
  @action clearFAQData = () => {
    this.faqList = []
  }
  @action addFAQ = () => {
    return new Promise((resolve, reject) => {
      FAQRequest.addFAQ(title, content)
        .then(res => {
          resolve(res)
          this.faqList = this.faqList.concat(res)
        })
        .catch(err => {
          message.error(err.res.data.message)
          reject(err)
        })
    })
  }
}

export default new FAQStore()