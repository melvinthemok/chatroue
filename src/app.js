import React from 'react'
import ReactDOM from 'react-dom'
import { IndexRoute, Route, browserHistory } from 'react-router'
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath'
import { MasterPage, IndexPage, LoginPage, RegistrationPage, AccountPage, CallPage, StreamPage } from './pages'

ReactStormpath.init()

ReactDOM.render(
  <Router history={browserHistory}>
    <HomeRoute path='/' component={MasterPage}>
      <IndexRoute component={IndexPage} />
      <LoginRoute path='/login' component={LoginPage} />
      <Route path='/register' component={RegistrationPage} />
      <AuthenticatedRoute>
        <HomeRoute path='/' component={IndexPage} />
        <Route path='/account' component={AccountPage} />
        <Route path='/call' component={CallPage} />
        <Route path='/stream' component={StreamPage} />
      </AuthenticatedRoute>
    </HomeRoute>
  </Router>,
  document.getElementById('app-container')
)
