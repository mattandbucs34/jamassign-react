import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class DefaultNav extends Component {
  render() {
    return (
      <div className='navbar-nav ml-auto'>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/dashboard' className='nav-link'>Home</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/show-list' className='nav-link'>List</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to= {`/${this.props.user.id}/profile`} className='nav-link'>Account</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <a href='/users/logout' className='nav-link'>
            Log Out <i className="fas fa-sign-out-alt"></i> 
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  // console.log(({ user }))
  return { user }
}

export default connect(mapStateToProps)(DefaultNav);