import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

import SignInForm from './SignInForm';

class SignInPage extends Component {
  render() {
    const { formValues, history, signInUser } = this.props;
    return(
      <SignInForm onSubmit={() => signInUser(formValues, history)} />
    )
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.signInForm
  }
}

export default connect(mapStateToProps, actions)(withRouter(SignInPage));