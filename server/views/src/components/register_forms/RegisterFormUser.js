import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RegisterField from './RegisterField';
import formFieldsUserInfo from './formFieldsUserInfo';

class RegisterUserPage extends Component {
  renderFields() {    
    return _.map(formFieldsUserInfo, field => {
      return <Field key={field.name} component={RegisterField} type={field.type} label={field.label} name={field.name} placeholder={field.placeholder}/>
    })
  }
  render() {
    return (
    <div className="row">
      <div className="col-md-6 mx-auto mt-3">
        <form onSubmit={this.props.handleSubmit} className="jam-form">
          <h3>Create Login Information</h3>
          <hr></hr>
          {this.renderFields()}
          <hr></hr>
          <button type="submit" className="btn btn-primary right">Continue<i className="fas fa-arrow-right" style={{marginLeft: '4px'}}></i></button>
        </form>
      </div>
    </div>
  )}
}

export default reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(RegisterUserPage)