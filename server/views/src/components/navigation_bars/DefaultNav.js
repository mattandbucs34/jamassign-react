import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DefaultNav extends Component {
  render() {
    return (
      <div className='navbar-nav ml-auto'>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/show-list' className='nav-link'>List</Link>
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

export default DefaultNav;