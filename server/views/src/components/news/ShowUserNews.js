import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions'

import ActiveNews from './ActiveNews';
import AddNewsPage from './AddNewsPage';
import DeletedNews from './DeletedNews';


class UserNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showActive: true,
      showDeleted: false,
      showAddNews: false
    }
  }
  

  async componentDidMount(){
    try {
      await this.props.fetchUser();
      await this.props.viewNewsDashboard();
    }catch(err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  }

  showActiveNews() {
    if(!this.state.showActive) {
      this.setState({
        showActive: true,
        showDeleted: false,
        showAddNews: false
      })
    }
  }

  showTrashNews() {
    if(!this.state.showDeleted) {
      this.setState({
        showActive: false,
        showDeleted: true,
        showAddNews: false
      })
    }
  }

  showAddNews() {
    if(!this.state.showAddNews) {
      this.setState({
        showActive: false,
        showDeleted: false,
        showAddNews: true
      })
    }
    console.log(this.state);
  }

  renderComponent() {
    if(this.state.showActive) {
      return <ActiveNews />
    }else if (this.state.showDeleted) {
      return <DeletedNews />
    }else if (this.state.showAddNews) {
      return <AddNewsPage onCreateNews={() => this.setState({
        showActive: true,
        showDeleted: false,
        showAddNews: false
      })}/>
    }else{
      return
    }
  }

  renderContent() {
    if(this.state.isLoading || !this.props.auth) {
      return 'Please Wait...';
    }else if(!this.props.views.auth) {
      return <Redirect to='/' />
    }else {
      return (
        <div>
          <h2 className='page-heading'>News Dashboard</h2>
          <div>
            <div className='jam-form'>
              <div className='row'>
                <div className='col-md-2'>
                  <button type='button' className='btn btn-link' 
                    onClick={() => {this.showActiveNews()}}>
                    Active
                  </button>
                  <button type='button' className='btn btn-link' 
                    onClick={() => {this.showTrashNews()}}>
                    Deleted
                  </button>
                  <button type='button' className='btn btn-link' 
                    onClick={() => {this.showAddNews()}}>
                    Create
                  </button>
                </div>
                <div className='col-md-10'>
                  {this.renderComponent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  render() {
    return this.renderContent();
  }
}

const mapStateToProps = ({ auth, views }) => {
  return { auth, views }
}

export default connect(mapStateToProps, actions)(withRouter(UserNews));