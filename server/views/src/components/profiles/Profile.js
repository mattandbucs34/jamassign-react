import _ from 'lodash';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewAccount } from '../../actions';
import formFields from './formFields';

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    try{
      await this.props.viewAccount();
      this.setState({ isLoading: false })
    }catch(err) {
      console.log(err);
      this.setState({ isLoading: false })
    }
  }

  renderFields() {
    return _.map(formFields, ({ name, label}) => {
      return (
        <div key={name} className='form-group'>
          <label htmlFor={name}>{label}</label>
          <input type='text' className='form-control' name={name} readOnly value={this.props.views.profile[name]} />
        </div>
      )
    })
  }

  renderContent() {
    if(this.state.isLoading) {
      return "Please Wait..."
    }else if(!this.props.auth) {
      return <Redirect to='/' />
    }else {
      return (
        <div>
          <h2>User Account</h2>
          <hr />
          <form>
            {this.renderFields()}
            <button type='button' className='btn btn-danger right'>Edit</button>
          </form>
        </div>
      )
    }
  }

  render() {
    return this.renderContent();
  }
}

let mapState = ({ views }) => {
  return { 
    views: views.profile,
    auth: views.auth
  }
}

export default connect(mapState, { viewAccount })(Profile)