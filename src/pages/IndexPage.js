import React, { PropTypes } from 'react'

export default class IndexPage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  }

  render () {
    return (
      <div className='container jumbotron'>
        <h1><em>talking heads</em></h1>
        <br />
        <br />
        <p className='lead'>{ this.context.user ? 'Hey ' + this.context.user.givenName : 'Welcome stranger' }!</p>
        <br />
        <div className='row text-center'>
          <div className='col-sm-4'>
            <img src='https://source.unsplash.com/collection/1236/320x180' />
          </div>
          <div className='col-sm-4'>
            <img src='https://source.unsplash.com/collection/1236/320x180' />
          </div>
          <div className='col-sm-4'>
            <img src='https://source.unsplash.com/collection/1236/320x180' />
          </div>
        </div>
      </div>
    )
  }
}
