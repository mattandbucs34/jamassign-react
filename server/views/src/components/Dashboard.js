import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
      this.setState({ isLoading: false })
    }catch(err) {
      this.setState({
        err,
        isLoading: false
      })
    }
  }

  renderContent() {
    if(this.state.isLoading) {
			return "Please wait...";
		}else if(!this.props.views.auth) {
			return <Redirect to='/' />
		}else {
      return (
        <div>
          <h1 className='page-heading'>
            User Dashboard
          </h1>
          <div className='row'>
            <div className='col-md-3 news'>
              <News />
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

function mapStateToProps({ user, views }) {
  return { user, views };
}

export default connect(mapStateToProps, actions)(withRouter(Dashboard));