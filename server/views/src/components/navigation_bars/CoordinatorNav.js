import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CoordinatorNav extends Component {
  render() {
    return(
      <div className='navbar-nav'>
        <Link to='/dashboard' className='nav-item nav-link ml-auto'>Home</Link>
        <Link to='/add-news' className='nav-item nav-link ml-auto'>Add News</Link>
        <Link to='/list-of-officials' className='nav-item nav-link ml-auto'>List</Link>
        <a href='/users/logout' className='nav-item nav-link ml-auto'>
          Log Out <i className="fas fa-sign-out-alt"></i> 
        </a>
      </div>
    )
  }
}

export default CoordinatorNav;