import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

export default class CallPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      roomValueInForm: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setRoomInCallPage = this.setRoomInCallPage.bind(this)
  }

  handleChange (event) {
    this.setState({
      roomValueInForm: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  setRoomInCallPage () {
    this.props.setRoomInMasterPage(this.state.roomValueInForm)
  }

  render () {
    return (
      <DocumentTitle title={`Call`}>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h3>Enter a call name</h3>
              <hr />
            </div>
          </div>
          <div className='row'>
            <br />
            <div className='col-xs-12'>
              <div className='form-horizontal' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='roomValue' className='col-xs-12 col-sm-4 control-label'>Call</label>
                  <div className='col-xs-12 col-sm-4'>
                    <input type='text' className='form-control' id='roomValue' name='roomValue' placeholder='Name' value={this.state.roomValueInForm} onChange={this.handleChange} />
                  </div>
                </div>
                <div className='form-group'>
                  <div className='col-sm-offset-4 col-sm-4'>
                    <span />
                    <span />
                    <Link to='/stream'>
                      <button type='submit' className='btn btn-primary' onClick={this.setRoomInCallPage}>Go</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
