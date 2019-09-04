import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';


class SignInForm extends Component {
  render() {
    return(
      <div className='row'>
        <div className='col-md-5 mx-auto mt-5'>
          <form onSubmit={this.props.handleSubmit} className='jam-form'>
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
            <Button variant='primary' type='submit' className='right'>Sign In</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  form: 'signInForm'
})(SignInForm)