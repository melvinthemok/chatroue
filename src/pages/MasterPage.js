import React from 'react'
import { Link } from 'react-router'
import { LoginLink } from 'react-stormpath'
import DocumentTitle from 'react-document-title'
import classnames from 'classnames'

import Header from './Header'

export default class is extends React.Component {
  constructor (props) {
    super(props)

    this.setRoomInMasterPage = this.setRoomInMasterPage.bind(this)

    this.state = {
      room: ''
      // inCall: false
    }
  }

  setRoomInMasterPage (roomValue) {
    this.setState({
      room: roomValue
    })
  }

  render () {
    return (
      <DocumentTitle title='Chatroue'>
        <div className='MasterPage'>
          <Header />
          { React.cloneElement(this.props.children, { room: this.state.room, setRoomInMasterPage: this.setRoomInMasterPage }) }
        </div>
      </DocumentTitle>
    )
  }
}
