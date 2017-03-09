import React from 'react'
import { Link } from 'react-router'
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath'

export default class Header extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-inverse navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed btn btn-primary navbar-btn' data-toggle='collapse' data-target='#oathcast-navbar-collapse'>
            <span className='sr-only'>Toggle navigation</span>
            <span>Menu</span>
          </button>
        </div>
        <div className='container'>
          <div id='oathcast-navbar-collapse' className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <NotAuthenticated>
                <li>
                  <LoginLink />
                </li>
              </NotAuthenticated>
              <NotAuthenticated>
                <li>
                  <Link to='/register'>Create Account</Link>
                </li>
              </NotAuthenticated>
              <Authenticated>
                <li>
                  <Link to='/call'>Call</Link>
                </li>
              </Authenticated>
              <Authenticated>
                <li>
                  <Link to='/account'>Account</Link>
                </li>
              </Authenticated>
              <Authenticated>
                <li>
                  <LogoutLink />
                </li>
              </Authenticated>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
