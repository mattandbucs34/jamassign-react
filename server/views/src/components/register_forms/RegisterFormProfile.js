import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RegisterField from './RegisterField';
import formFields from './formFieldsProfile';
import fiftyStates from '../fifty_states/fiftyStates';

class RegisterForm extends Component {
  
  renderFields() {    
    return _.map(formFields, field => {
      return <Field key={field.name} component={RegisterField} type={field.type} label={field.label} name={field.name} placeholder={field.placeholder}/>
    })
  }

  renderFiftyStates() {
    return _.map(fiftyStates, states => {
      return (
        <option key={states.value}  value={states.value} >{states.value}</option>  
      )
    })
  }


  render() {
    return(
      <div className="row">
        <div className="col-md-6 mx-auto mt-3">
          <form onSubmit={this.props.handleSubmit} className="jam-form">
            <h3>Enter Profile Information</h3>
            <hr></hr>
            {this.renderFields()}
            <div className="row">
              <div className='form-group col-md-4 col-4'>
                <label htmlFor='state'>State:</label>
                <Field name='state' component='select' className="form-control">
                  {this.renderFiftyStates()}
                </Field>
              </div>
              <div className='form-group'>
                <label htmlFor='zip'>Zip Code: <small>#####</small></label>
                <Field className='form-control' name='zip' component='input' type='text' />
              </div>
            </div>
            
            <div className='form-group'>
              <label htmlFor='mobile'>Mobile Number: <small>###-###-####</small></label>
              <Field className='form-control' name='mobile' component='input' type='tel' />
            </div>
            
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'registerForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(RegisterForm)