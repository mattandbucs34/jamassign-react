import _ from 'lodash';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserProfile, viewAccount } from '../../actions';
import formFields from './formFields';

class ShowProfile extends Component {
  state = {
    isLoading: true,
    profile: [],
  }

  async componentDidMount() {
    try{
      await this.props.viewAccount(this.props.auth.id);
      this.setState({
        isLoading: false,
        profile: this.props.profile.profile.profile
      })
    }catch(err) {
      this.setState({ isLoading: false })
    }
  }

  async componentDidUpdate(prevProps) {
    console.log(prevProps)
    if(prevProps.profile.length === 0)
    try {
      await this.props.fetchUserProfile();
      this.setState({
        profile: this.props.profile.profile.profile
      })
    }catch(err) {
      console.log(err);
    }
  }

  renderFields() {
    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name} className='form-group'>
          <label htmlFor={name}>{label}</label>
          <input type='text' className='form-control' name={name} readOnly value={this.state.profile[name]} />
        </div>
      )
    })
  }

  renderContent() {
    if(this.state.isLoading) {
      return "Please Wait..."
    }else if(!this.props.views.auth) {
      return <Redirect to='/' />
    }else {
      return (
        <div>
          <h2>User Account</h2>
          <hr />
          <div className='row'>
            <form className='col-md-8 col-10 jam-form profile-form'>
              {this.renderFields()}
              <button onClick={this.props.profileEdit} className='btn btn-danger right' id='profileBtn' type='button'>Edit</button>
            </form>
          </div>
          
        </div>
      )
    }
  }

  render() {
    return this.renderContent();
  }
}

let mapState = ({ auth, profile, views }) => {
  console.log({ auth, profile })
  return { auth, profile, views }
}

export default connect(mapState, { fetchUserProfile, viewAccount })(ShowProfile)