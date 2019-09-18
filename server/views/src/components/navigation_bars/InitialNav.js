import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarInitial extends Component{
  render() {
    return (
      <div className='navbar-nav ml-auto'>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/sign_in' className='nav-link' >Sign In</Link>
        </div>
        <div className='nav-item ml-auto' data-toggle='collapse' data-target='.navbar-collapse.show'>
          <Link to='/register' className='nav-link' >Register</Link>
        </div>
      </div>
    )
  }
}

export default NavbarInitial;