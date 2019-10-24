import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Messages from './Messages';

class Landing extends Component {
  constructor(props) {
    super(props)

    this.state= {
      message: '',
      type: ''
    }
  }

  componentDidMount() {
    if(_.isEmpty(this.props.views)) {
      return
    }else if(!this.props.user) {
      this.setState({
        message: this.props.message,
        type: this.props.type
      });
    }else if(!this.props.views.auth) {
      this.setState({
        message: this.props.views.message,
        type: this.props.views.type
      })
    }else {
      return
    }
  }
  
  renderMessage() {
    if(!this.props.user === undefined) {
      let message = 'You must be logged in';
      let type = 'warning';
      return <Messages message={message} 
      type={type} />
    }else {
      return
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center'}}>
        <h1 className='page-heading'>
          Landing Page
        </h1>
        {this.renderMessage()}
      </div>
    )
  }
}

function mapStateToProps({ user, views }) {
  return { user, views }
}

export default connect(mapStateToProps)(withRouter(Landing));