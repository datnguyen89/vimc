import { observable, action } from 'mobx'
import { message } from 'antd'
import uuid from 'uuid'

class NotificationsStore {

  /**
   * Mock data
   * Just for testing
   * @param: Status: 0: unread, 1: read
   * */
  @observable notificationList = [
    {
      id: uuid(),
      user: 'Pete Cash',
      userId: uuid(),
      action: 'sent you invitation',
      status: 0,
    },
    {
      id: uuid(),
      user: 'Jossie David',
      userId: uuid(),
      action: 'sent you invitation',
      status: 0,
    },
    {
      id: uuid(),
      user: 'Van Persie',
      userId: uuid(),
      action: 'sent you form request to approved',
      status: 0,
    },
    {
      id: uuid(),
      user: 'Von Domme',
      userId: uuid(),
      action: 'sent you invitation',
      status: 0,
    },
    {
      id: uuid(),
      user: 'Jimmy Carter',
      userId: uuid(),
      action: 'sent you invitation',
      status: 0,
    },
  ]

  @action clearNotification() {
    this.notificationList = []
    message.success(`All notifications marked as read`)
  }

  @action getAllNotifications() {

  }

}

export default new NotificationsStore()