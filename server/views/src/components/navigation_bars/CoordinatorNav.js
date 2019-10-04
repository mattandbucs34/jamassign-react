import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class CoordinatorNav extends Component {
  render() {
    // console.log(this.props.user.id)
    return(
      <div className='navbar-nav ml-auto'>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/dashboard' className='nav-link'>Home</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to={`/${this.props.auth.id}/articles/dashboard`} className='nav-link'>Articles</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/show-list' className='nav-link'>List</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to= {`/${this.props.auth.id}/profile`} className='nav-link'>Account</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <a href='/users/logout' className='nav-link'>
            Log Out &nbsp;
            <FontAwesomeIcon icon={faSignOutAlt} />
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, profile, user }) => {
  // console.log(({ user }))
  return { auth, profile, user }
}

export default connect(mapStateToProps)(CoordinatorNav);