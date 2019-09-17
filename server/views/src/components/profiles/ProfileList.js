import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      warning: 'true',
      clickedId: 0
    }
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchProfiles();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(id) {
    this.setState({ show: true, clickedId: id });
  }

  renderModalEmail() {
    if(this.props.profile.user !== undefined) {
      return this.props.profile.user.map(users => {
        if(users.id === this.state.clickedId) {
          return <a href={'mailto:' + users.userEmail} key={users.id}>{users.userEmail}</a>
        }
        return null;
      })
    }
  }

  renderModalBody() {
    if(this.props.profile.profileList !== undefined) {
      return this.props.profile.profileList.map(profiles => {
        if(profiles.id === this.state.clickedId) {
          return (
            <div key={profiles.id}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {profiles.firstName} {profiles.lastName}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>{profiles.address1}</div>
                <div>{profiles.address2}</div>
                <div>{profiles.city}, {profiles.state} {profiles.zip}</div>
                <div style={{paddingTop: '10px'}}>{profiles.mobile}</div>
                <div>{this.renderModalEmail()}</div>
              </Modal.Body>
            </div>
          )
        }
        return null;
      })
    }
  }

  renderNames() {
    if(this.props.profile.profileList != null) {
      return this.props.profile.profileList.map(profiles => {
        return (
          <table className='name-table'>
          <tbody>
            <tr key={profiles.id} className='name-row'>
              <td className='name-cell'>
                <Link to="#" onClick={() => this.handleShow(profiles.id)}>{profiles.lastName}, {profiles.firstName}</Link>
              </td>
            </tr>
          </tbody>
        </table>
        )
      })
    }
  }

  renderContent() {
    if(!this.props.profile){
      return null
    }else if(this.props.profile.auth === false) {
      return <Redirect to={{
        pathname: '/',
        state: {
          referrer: '/list-of-officials',
          message: this.props.profile.message,
          type: this.props.profile.type
        }
      }} />
    }else if(this.props.auth !== undefined && this.props.auth.user === false) {
      return <Redirect to={{
        pathname: '/',
        state: {
          referrer: '/list-of-officials',
          message: this.props.profile.message,
          type: this.props.profile.type
        }
      }} />
    }else if(this.props.auth && this.props.profile) {
      return (
        <div>
          <h2>List of Officials</h2>
          <hr />
          {this.renderNames()}
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            {this.renderModalBody()}
          </Modal>
        </div>
      )
    }
    return null
  }

  render() {
    return(
      <div>{this.renderContent()}</div>
    )
  }
}

function mapStateToProps( { auth, profile, user } ) {
  console.log({ auth, profile, user })
  return { profile, user }
}

export default connect(mapStateToProps, actions)(withRouter(ProfileList));