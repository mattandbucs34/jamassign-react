import _ from 'lodash';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
      await this.props.viewAccount(this.props.user.id);
      this.setState({
        isLoading: false,
        profile: this.props.profile.profile.profile
      })
    }catch(err) {
      this.setState({ isLoading: false })
    }
  }

  async componentDidUpdate(prevProps) {
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
          <h2 className='page-heading'>User Account</h2>
          <hr />
          <div className='row'>
            <form className='col-md-8 col-10 jam-form profile-form'>
              {this.renderFields()}
              <div className="row">
                <div className='form-group col-md-4 col-4'>
                  <label htmlFor='state'>State:</label>
                  <input name='state' className="form-control" onChange={this.handleChange} value={this.state.profile.state} readOnly>
                  </input>
                </div>
                <div className='form-group'>
                  <label htmlFor='zip'>Zip Code: <small>#####</small></label>
                  <input className='form-control' name='zip' type='text' value={this.state.profile.zip} onChange={this.handleChange} readOnly/>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='mobile'>Mobile Number: <small>###-###-####</small></label>
                <input className='form-control' name='mobile' value={this.state.profile.mobile} type='tel' onChange={this.handleChange} readOnly />
              </div>
              <div className='button-right'>
                <button onClick={this.props.profileEdit} className='btn btn-danger right' id='profileBtn' type='button'>Edit</button>
              </div>
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

let mapState = ({ profile, user, views }) => {
  console.log({ profile })
  return { profile, user, views }
}

export default connect(mapState, { fetchUserProfile, viewAccount })(ShowProfile)