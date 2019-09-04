import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div style={{ textAlign: 'center'}}>
        <h1>
          User Dashboard
        </h1>
      </div>
    )
  }
}

export default connect(null, actions)(Dashboard);