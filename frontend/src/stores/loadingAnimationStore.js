import { observable, action } from 'mobx'

class LoadingAnimationStore {

  /** Loading spinner state */
  @observable isVisible = false

  @action showSpinner = state => {
    this.isVisible = state
  }

  /** Clear data */
  @action clearStore = () => {
    this.isVisible = false
  }

}

export default new LoadingAnimationStore()