import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as actions from '../../actions';

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

function mapStateToProps({ form }) {
  return {
    formValues: form.signInForm
  }
}

export default connect(mapStateToProps, actions)(withRouter(SignInPage));