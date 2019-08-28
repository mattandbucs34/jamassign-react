import '../assets/main.css';
import Container from 'react-bootstrap/Container';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import RegisterPage from './register_forms/RegisterPage';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Container>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={RegisterPage} />
      </Container>
    )
  }
}

export default connect(null, actions)(App);