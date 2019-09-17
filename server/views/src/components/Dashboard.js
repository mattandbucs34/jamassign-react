import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Messages from './Messages';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent() {
    switch(this.props.auth.user){
      default:
        return null;
      case false:
        return <Redirect to={{
          pathname: '/',
          state: { 
            referrer: '/dashboard',
            type: 'warning',
            message: 'You must be logged in to do that'
            }
          }} />
      case true:
        return (
          <div style={{ textAlign: 'center'}}>
            <h1>
              User Dashboard
            </h1>
            <Messages message={this.state.flash.message} type={this.state.flash.type} />
          </div>
        )
    }
  }

  render() {
    return (
      <div>{this.renderContent()}</div>
    )
  }
}

function mapStateToProps({ auth, user, news }) {
  console.log({ auth, user, news })
  return { auth, user, news };
}

export default connect(mapStateToProps, actions)(withRouter(Dashboard));