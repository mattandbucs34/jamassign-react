import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfiles } from '../../actions';

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
    this.props.fetchProfiles();
  }

  componentDidUpdate() {
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
      })
    }
  }

  renderNames() {
    if(this.props.profile.profileList != null) {
      return this.props.profile.profileList.map(profiles => {
        return (
          <tr key={profiles.id}>
            <td className='name-cell'>
              <Link to="#" onClick={() => this.handleShow(profiles.id)}>{profiles.lastName}, {profiles.firstName}</Link>
            </td>
          </tr>
        )
      })
    }
  }

  renderError() {
    if(this.props.profile.error){
      return (
        <div className='alert alert-danger alert-dismissable fade show'  role='alert'>
          <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
          {this.props.profile.error}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>List of Officials</h2>
        <hr />
        {this.renderError()}
        <table className='name-table'>
          <tbody>
            {this.renderNames()}
          </tbody>
        </table>
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          {this.renderModalBody()}
        </Modal>
      </div>
    )
  }
}

function mapStateToProps( profile ) {
  return profile
}

export default connect(mapStateToProps, { fetchProfiles })(ProfileList);