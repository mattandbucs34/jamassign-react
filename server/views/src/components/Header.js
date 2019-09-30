import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CoordinatorNav from './navigation_bars/CoordinatorNav';
import DefaultNav from './navigation_bars/DefaultNav';
import NavbarInitial from './navigation_bars/InitialNav';


class Header extends Component {
 
  renderNav() {
    switch (this.props.auth.role) {
      case undefined:
      case null:
        return <NavbarInitial />
      case 'coordinator':
        return <CoordinatorNav />
      default:
        return <DefaultNav />
    }
  }
  
  render() {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link to={(this.props.auth.user) ? '/dashboard' : '/'} className='navbar-brand'>
          JAM Officials
        </Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          {this.renderNav()}
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header);