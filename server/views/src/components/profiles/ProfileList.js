import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewList } from '../../actions';

import Messages from '../Messages';

class ProfileList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickedId: 0,
      isLoading: true,
      profiles: [],
      show: false,
      users: [],
      message: '',
      type: ''
    }
  }

  async componentDidMount() {
    try {
      await this.props.viewList();
      this.setState({ isLoading: false })
    }catch (err) {
      this.setState({ isLoading: false })
    }
    

    const prof = await axios.get('/profiles/fetch-list');
    
    this.setState({
      profiles: prof.data.profileList,
      users: prof.data.user
    })
    
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(id) {
    this.setState({ show: true, clickedId: id });
  }

  renderModalEmail() {
    return this.state.users.map(users => {
      if(users.id === this.state.clickedId) {
        return <a href={'mailto:' + users.userEmail} key={users.id}>{users.userEmail}</a>
      }
      return null;
    })
  }

  renderModalBody() {
    return this.state.profiles.map(profiles => {
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

  renderDelete(id) {
    if(this.props.auth.role === 'coordinator'){
      return(
        <button type='button' className='btn delete-btn' onClick={() => this.deleteUser(id)}><i className='far fa-trash-alt'></i></button>
      )
    }
    return
  }

  async deleteUser(id) {
    const res = await axios.post(`/profiles/${id}/destroy`);

    const prof = await axios.get('/profiles/fetch-list');
    
    this.setState({
      profiles: prof.data.profileList,
      users: prof.data.user,
      message: res.data.message,
      type: res.data.type
    })
  }

  renderNames() {
    return this.state.profiles.map(profiles => {
      return (
        <div key={profiles.id} className='row name-row'>
          <div className='name-cell col-md-8 col-6'>
            <Link to="#" onClick={() => this.handleShow(profiles.id)}>{profiles.lastName}, {profiles.firstName}</Link>
          </div>
          <div className='phone-cell col-md-4 col-6'>
            <a href={`tel:${profiles.mobile}`}>{profiles.mobile}</a>
            {this.renderDelete(profiles.id)}
          </div>
        </div>
      )
    })
  }

  renderContent() {
    if(this.state.isLoading){
      return 'Please wait...';
    }else if(!this.props.views.auth) {
      return <Redirect to='/' />
    }else {
      return (
        <div>
          <h2 className='page-heading'>List of Officials</h2>
          <hr />
          <Messages message={this.state.message} type={this.state.type} />
          <div className='list-group'>
            {this.renderNames()}
          </div>
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            {this.renderModalBody()}
          </Modal>
        </div>
      )
    }
  }

  render() {
    return(
      <div>{this.renderContent()}</div>
    )
  }
}

function mapStateToProps( { auth, views } ) {
  return { auth, views }
}

export default connect(mapStateToProps, { viewList })(withRouter(ProfileList));