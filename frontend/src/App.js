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
import commonStore from './stores/commonStore'
import loadingAnimationStore from './stores/loadingAnimationStore'
import userStore from './stores/userStore'
// Pages
import PortalPage from './pages/PortalPage'
import EOffice from './pages/EOffice'
import EMail from './pages/EMail'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('jwt') || sessionStorage.getItem('jwt')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
  )}/>
)

const history = createBrowserHistory()

const rootStore = {
  commonStore,
  loadingAnimationStore,
  userStore,
}

const App = () => {

  useEffect(() => {
    userStore.checkCurrentUser()
  }, [])

  return (
    <Provider {...rootStore}>
      <ThemeProvider>
        <Router history={history}>
          <Switch>
            <Route exact path={'/'} component={PortalPage}/>
            <Route exact path={'/EOffice'} component={EOffice}/>
            <Route exact path='/Email' component={EMail}/>

          </Switch>
        </Router>
        <LoadingSpinner/>
      </ThemeProvider>
    </Provider>
  )
}

export default App
