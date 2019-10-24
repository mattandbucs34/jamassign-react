import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { signInUser } from '../../actions';

import SignInForm from './SignInForm';

class SignInPage extends Component {
  render() {
    const { formValues, history, signInUser } = this.props;
    
    return(
      <div>
        <SignInForm onSubmit={() => signInUser(formValues, history)} />
      </div>
    )
  }
}

function mapStateToProps({ form, user }) {
  return {
    formValues: form.signInForm,
    user
  }
}

export default connect(mapStateToProps, { signInUser })(withRouter(SignInPage));