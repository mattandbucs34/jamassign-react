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
      setShow: false
    }
  }
  componentDidMount() {
    this.props.fetchProfiles();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderNames() {
    if(this.props.profile != null) {
      return this.props.profile.map(profiles => {
        return (
          <tr key={profiles.id}>
            <td className='name-cell'>
              <Link to="#" onClick={() => this.handleShow()}>{profiles.lastName}, {profiles.firstName}</Link>
            </td>
          </tr>
        )
      })
    }
  }

  render() {

    return (
      <div>
        <h2>List of Officials</h2>
        <table className='name-table'>
          <tbody>
            {this.renderNames()}
          </tbody>
        </table>
        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Address Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.profile.firstName}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ profile }) {
  return { profile } 
}

export default connect(mapStateToProps, { fetchProfiles })(ProfileList);