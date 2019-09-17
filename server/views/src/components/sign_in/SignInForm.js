import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';

import Message from '../Messages';

class SignInForm extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  
  renderMessage() {
    console.log(this.props.user.message)
    if(this.props.user === undefined) {
      return null
    }else if(this.props.user.user === false){
      let message = 'Invalid Email or Password';
      let type = 'danger';
      return <Message message={message} type={type} />
    }else if(this.props.user.user === true) {
      return <Redirect to={{
        pathname: '/',
        state: {
          referrer: '/sign_in',
          message: 'You have successfully logged in',
          type: 'success'
        }
      }} />
    }
    return
  }
  
  render() {
    return(
      <div className='row'>
        <div className='col-md-5 mx-auto mt-5'>
          <form onSubmit={this.props.handleSubmit} className='jam-form'>
            {this.renderMessage()}
            <h3>Sign In</h3>
            <hr></hr>
            <div className='form-group'>
              <label htmlFor='userEmail'>Enter Your Email</label>
              <Field component='input' type='email' name='userEmail' className='form-control'></Field>
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Enter Your Password</label>
              <Field component='input' type='password' name='password' className='form-control'></Field>
            </div>
            <hr></hr>
            <button type='submit' className='btn btn-primary right'>Sign In</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ user }) {
  return {
    user
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'signInForm'
})(SignInForm))