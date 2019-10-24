import '../assets/main.css';
import Container from 'react-bootstrap/Container';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import NewsPage from './news/NewsDashboard';
import EditNews from './news/EditNews';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Header from './Header';
import Profile from './profiles/Profile';
import ProfileList from './profiles/ProfileList';
import RegisterPage from './register_forms/RegisterPage';
import SignInPage from './sign_in/SignInPage';
import CreateSite from './Sites/SiteCreate';
import EditSite from './Sites/SiteEdit';
import SiteDashboard from './Sites/SiteDashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate(prevProps) {
    if(this.props.user.id !== prevProps.user.id) {
      this.props.fetchUser();
      this.props.fetchUserProfile();
    }
  }

  render() {
    return (
      <div>
      <Header />
      <Container>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/sign_in' component={SignInPage} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/show-list' component={ProfileList} />
        <Route exact path='/:id/articles/dashboard' component={NewsPage} />
        <Route path='/:id/articles/:articleId/edit/' component={EditNews} />
        <Route path='/:id/profile' component={Profile} />
        <Route path='/sites/dashboard' component={SiteDashboard} />
        <Route path='/sites/create' component={CreateSite} />
        <Route path='/sites/:siteId/edit' component={EditSite} />
      </Container>
      </div>
    )
  }
}

function mapState(state) {
  return state
}

export default connect(mapState, actions)(App);