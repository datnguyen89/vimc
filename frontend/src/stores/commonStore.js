import { observable, action } from 'mobx'

class CommonStore {

  /** Page name management */
  @observable pageName = []
  @action setPage = pageName => {
    this.pageName = pageName
  }

  /** App theme */
  @observable appTheme = {
    name: 'green',
    solidColor: '#3DBEA3',
    solidLightColor: '#ecf9f6',
    gradientColor: 'linear-gradient(167.51deg, #2ECF94 24.37%, #3DBEA3 78.07%)',
    shadowColor: '0 2px 10px rgba(46,207,148,0.6)',
    lightShadowColor: '0 2px 4px rgba(61, 190, 163, 0.24), 0 4px 8px rgba(61, 190, 163, 0.16)',
  }

  @action setTheme = themeName => {
    switch (themeName) {
      case 'green':
        this.appTheme = {
          name: themeName,
          solidColor: '#3DBEA3',
          solidLightColor: '#ecf9f6',
          gradientColor: 'linear-gradient(167.51deg, #2ECF94 24.37%, #3DBEA3 78.07%)',
          shadowColor: '0 2px 10px rgba(46,207,148,0.6)',
          lightShadowColor: '0 2px 4px rgba(61, 190, 163, 0.24), 0 4px 8px rgba(61, 190, 163, 0.16)',
        }
        break
      case 'pink':
        this.appTheme = {
          name: themeName,
          solidColor: 'rgb(244, 67, 54)',
          solidLightColor: 'rgb(254, 237, 235)',
          gradientColor: 'linear-gradient(108.84deg, #F77062 0%, #FE5196 100%)',
          shadowColor: '0 2px 10px rgba(254, 81, 150, 0.5)',
          lightShadowColor: '0 2px 4px rgba(190, 61, 97, 0.24), 0 4px 8px rgba(190, 61, 61, 0.16)',
        }
        break
      case 'blue':
        this.appTheme = {
          name: 'blue',
          solidColor: 'rgb(33, 150, 243)',
          solidLightColor: 'rgb(233, 245, 254)',
          gradientColor: 'linear-gradient(108.88deg, #04BEFE 0%, #4481EB 100%)',
          shadowColor: '0 2px 10px rgba(68, 129, 235, 0.5)',
          lightShadowColor: '0 2px 4px rgba(61, 147, 190, 0.24), 0 4px 8px rgba(61, 153, 190, 0.16)',
        }
        break
      case 'csstricks':
        this.appTheme = {
          name: 'csstricks',
          solidColor: 'rgb(229,46,113)',
          solidLightColor: 'rgba(229,46,113, .2)',
          gradientColor: 'linear-gradient(to top left,#ff8a00,#e52e71)',
          shadowColor: '0px 2px 10px rgba(229,46,113, 0.5)',
          lightShadowColor: '0 2px 4px rgba(190, 61, 97, 0.24), 0 4px 8px rgba(190, 61, 61, 0.16)',
        }
        break
      case 'black':
        this.appTheme = {
          name: 'black',
          solidColor: 'rgb(70, 70, 70)',
          solidLightColor: 'rgb(200, 200, 200)',
          gradientColor: 'linear-gradient(108.88deg, rgb(121, 121, 121) 0%, rgb(70, 70, 70) 100%)',
          shadowColor: '0px 2px 10px rgba(70, 70, 70, 0.5)',
          lightShadowColor: '0 2px 4px rgba(0, 0, 0, 0.22), 0 4px 8px rgba(0, 0, 0, 0.04)',
        }
        break
      default:
        break
    }
  }

  /** Sidebar */
  @observable isSidebarCollapsed = false
  @action toggleCollapsedSidebar = state => {
    this.isSidebarCollapsed = state
  }

  /** Mouse Cordinate */
  @observable mouseCordinate = {
    x: 0,
    y: 0,
  }

  @action setMouseCordinate = e => {
    this.mouseCordinate.x = e.clientX
    this.mouseCordinate.y = e.clientY
  }

  /** Clear data */
  @action clearStore = () => {
    this.pageName.length = 0
    this.setTheme('green')
    this.isSidebarCollapsed = false
    this.mouseCordinate = {
      x: 0,
      y: 0,
    }
  }

}

export default new CommonStore()