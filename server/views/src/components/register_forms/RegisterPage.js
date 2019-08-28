import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterFormProfile from './RegisterFormProfile';
import RegisterFormUser from './RegisterFormUser';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';


class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1})
  }

  previousPage() {
    this.setState({ page: this.state.page - 1})
  }

  render(){
    const { formValues, history, registerUser } = this.props;
    const { page } = this.state
    return(
      <div>
        {page === 1 && <RegisterFormUser onSubmit={this.nextPage} /> }
        {page === 2 && <RegisterFormProfile onSubmit={() => registerUser(formValues, history)} /> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    formValues: state.form.registerForm
  }
}

export default connect(mapStateToProps, actions)(withRouter(RegisterPage));