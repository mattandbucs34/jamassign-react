import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarInitial extends Component{
  render() {
    return (
      <div className='navbar-nav'>
        <Link to='/sign_in' className='nav-item nav-link ml-auto'>Sign In</Link>
        <Link to='/register' className='nav-item nav-link ml-auto'>Register</Link>
      </div>
    )
  }
}

export default NavbarInitial;