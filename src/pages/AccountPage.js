import React from 'react'
import DocumentTitle from 'react-document-title'
import { UserProfileForm } from 'react-stormpath'

export default class AccountPage extends React.Component {
  render () {
    return (
      <DocumentTitle title={`Account settings`}>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h3>Account settings</h3>
              <hr />
            </div>
          </div>
          <div className='row'>
            <br />
            <div className='col-xs-12'>
              <UserProfileForm />
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
