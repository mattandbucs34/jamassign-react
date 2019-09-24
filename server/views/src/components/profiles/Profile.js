import React, { Component } from 'react';
import EditProfile from './EditProfile';
import ShowProfile from './ShowProfile';

class Profile extends Component {
  state = { showProfileEdit: false }

  renderContent() {
    if(this.state.showProfileEdit) {
      return <EditProfile cancelEdit={() => this.setState({ showProfileEdit: false })} />
    }

    return <ShowProfile profileEdit={() => this.setState({ showProfileEdit: true })} />
  }

  render() {
    return this.renderContent();
  }
}

export default Profile