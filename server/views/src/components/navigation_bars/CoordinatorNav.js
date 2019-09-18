import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CoordinatorNav extends Component {
  render() {
    return(
      <div className='navbar-nav ml-auto'>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/dashboard' className='nav-link'>Home</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/add-news' className='nav-link'>Add News</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/list-of-officials' className='nav-link'>List</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/account' className='nav-link'>Account</Link>
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

export default CoordinatorNav;