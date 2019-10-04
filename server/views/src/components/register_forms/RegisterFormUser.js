import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RegisterField from './RegisterField';
import formFieldsUserInfo from './formFieldsUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
          <div style={{ position: 'relative', height: '20rem'}}>
            {this.renderFields()}
            <hr></hr>
            <div className='button-right'>
              <button type="submit" className="btn btn-primary right">Continue<FontAwesomeIcon icon={faArrowRight} style={{marginLeft: '6px'}} /></button>
            </div>
          </div>
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