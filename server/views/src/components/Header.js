import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLogin() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Nav>
            <Nav.Item>
              <Nav.Link href="/sign_in">Sign In</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          </Nav>
        )
      default:
        return (
          <Nav>
            <Nav.Item>
              <Nav.Link href='/list-of-officials'>List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/users/logout">Log Out</Nav.Link>
            </Nav.Item>
          </Nav>
        )
    }
  }
  
  render() {
    return (
      <Navbar expand='lg' bg='dark' variant='dark'>
        <Link to="/">
          <Navbar.Brand>JAM Officials</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-right justify-content-end">
          <Nav>
            {this.renderLogin()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header);