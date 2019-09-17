import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DefaultNav extends Component {
  render() {
    return (
      <div className='navbar-nav'>
        <Link to='/list-of-officials' className='nav-item nav-link ml-auto'>List</Link>
        <a href='/users/logout' className='nav-item nav-link ml-auto'>
          Log Out 
          <i className="fas fa-sign-out-alt">
          </i>
        </a>
      </div>
    )
  }
}

export default DefaultNav;