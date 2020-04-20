import React, { useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
// Styling
import './App.less'
import ThemeProvider from './providers/ThemeProvider'
// React Router
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// MobX
import { Provider } from 'mobx-react'
import { toJS } from 'mobx'
import commonStore from './stores/commonStore'
import loadingAnimationStore from './stores/loadingAnimationStore'
import userStore from './stores/userStore'
import accountStore from './stores/accountStore'
import commandStore from './stores/commandStore'
// Pages
import PortalPage from './pages/PortalPage'
import EOffice from './pages/EOffice'
import EMail from './pages/EMail'
import HomePage from './pages/HomePage'
import UserInfo from './pages/UserInfo'
import UserAccount from './pages/UserAccount'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('jwt') || sessionStorage.getItem('jwt')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location },
      }}/>
  )}/>
)

const history = createBrowserHistory()

const rootStore = {
  commonStore,
  loadingAnimationStore,
  userStore,
  accountStore,
  commandStore,
}

const App = () => {

  useEffect(() => {
    userStore.checkCurrentUser()
  }, [])

  useEffect(() => {
    commonStore.setTheme('blue')
  }, [])

  return (
    <Provider {...rootStore}>
      <ThemeProvider>
        <Router history={history}>
          <Switch>
            <Route exact path={'/'} component={PortalPage}/>
            <Route exact path={'/EOffice'} component={EOffice}/>
            <Route exact path='/Email' component={EMail}/>
            <ProtectedRoute exact path='/HomePage' component={HomePage}/>
            <ProtectedRoute exact path='/UserInfo' component={UserInfo}/>
            <ProtectedRoute exact path='/UserAccount' component={UserAccount}/>
          </Switch>
        </Router>
        <LoadingSpinner/>
      </ThemeProvider>
    </Provider>
  )
}

export default App
