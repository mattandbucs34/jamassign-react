import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import Messages from './Messages';

class Landing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      type: '',
      referrer: ''
    }
  }
  
  renderMessage() {
    console.log(this.props.location.state);
    if(this.props.location.state !== undefined && !this.props.auth.user){
      return <Messages message={this.props.location.state.message} 
      type={this.props.location.state.type} />
    }
    return
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

function mapStateToProps({ auth, user, news }) {
  return { auth, user, news }
}

export default connect(mapStateToProps, actions)(withRouter(Landing));