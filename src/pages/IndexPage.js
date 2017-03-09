import React, { PropTypes } from 'react'

export default class IndexPage extends React.Component {
  static contextTypes = {
    user: React.PropTypes.object
  }

  render () {
    return (
      <div className='container jumbotron'>
        <h1>Chatroue</h1>
        <hr />
        <p className='lead'>{ this.context.user ? 'Hey ' + this.context.user.givenName : 'Welcome stranger' }!</p>
      </div>
    )
  }
}
