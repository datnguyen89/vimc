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
import faqStore from './stores/faqStore'
import notificationStore from './stores/notificationsStore'
// Pages
import PortalPage from './pages/PortalPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SupportPage from './pages/SupportPage'
import NotificationsPage from './pages/NotificationsPage'
import RegisterPage from './pages/RegisterPage'
import SettingsPage from './pages/SettingsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ForgotPasswordSentPage from './pages/ForgotPasswordSentPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

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
  faqStore,
  notificationStore,
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
            <Route exact path={'/login'} component={LoginPage}/>
            <Route exact path={'/verified'} component={LoginPage}/>
            <Route exact path={'/register'} component={RegisterPage}/>
            <Route exact path={'/forgot-password'} component={ForgotPasswordPage}/>
            <Route exact path={'/forgot-password/success'} component={ForgotPasswordSentPage}/>
            <Route exact path={'/reset-password/:token'} component={ResetPasswordPage}/>
            <Route exact path={'/'} component={PortalPage}/>
            <ProtectedRoute exact path={'/support'} component={SupportPage}/>
            <ProtectedRoute exact path={'/notifications'} component={NotificationsPage}/>
            <ProtectedRoute exact path={'/settings'} component={SettingsPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </Router>
        <LoadingSpinner/>
      </ThemeProvider>
    </Provider>
  )
}

export default App
