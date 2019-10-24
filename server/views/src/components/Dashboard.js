import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { fetchAllSites, viewDashboard } from '../actions';

import News from './news/ShowNews';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }
  
  async componentDidMount() {
    try {
      await this.props.viewDashboard();
      await this.props.fetchAllSites();
      // this.setState({ isLoading: false })
    }catch(err) {
      console.log(err);
      // this.setState({
      //   err,
      //   isLoading: false
      // })
    }
  }

  renderContent() {
    // if(this.state.isLoading) {
		// 	return "Please wait...";
    // }else 
    if(!this.props.user.loggedIn) {
			return <Redirect to='/' />
		}else {
      return (
        <div className='row'>
          <div className='col-md-3'>
            <div className='dash-sidebar'>
              <Link to='/:id/articles/dashboard' className='btn' ><FontAwesomeIcon icon={faNewspaper} /> &nbsp; Article Actions</Link>
              <Link to='/sites/dashboard' className='btn' ><FontAwesomeIcon icon={faSchool} /> &nbsp; School Actions</Link>
            </div>
          </div>
          <div className='col-md-9'>
            <h1 className='page-heading'>
              User Dashboard
            </h1>
            <div className='row'>
              <div className='container'>
                <div className='jumbotron'>
                  Filler
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='container news'>
                <News />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return this.renderContent()
  }
}

function mapStateToProps({ sites, user, views }) {
  return { sites, user, views };
}

export default connect(mapStateToProps, { fetchAllSites, viewDashboard })(withRouter(Dashboard));