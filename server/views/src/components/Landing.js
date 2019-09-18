import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

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
    if(this.props.views.auth === false) {
      return <Messages message={this.state.message} 
      type={this.state.type} />
    }else {
      return
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center'}}>
        <h1>
          Landing Page
        </h1>
        {this.renderMessage()}
      </div>
    )
  }
}

function mapStateToProps({ auth, user, views }) {
  return { auth, user, views }
}

export default connect(mapStateToProps, actions)(withRouter(Landing));