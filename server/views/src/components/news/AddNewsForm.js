import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

class AddNewsForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit} >
        <div className='form-group'>
          <label htmlFor='newsSubject'>Subect:</label>
          <Field type='text' className='form-control' component='input' name='newsSubject' placeholder='Subject' />
        </div>
        <div className="form-group">
          <label htmlFor='newsMessage'>Message:</label>
          <Field className='form-control' component='textarea' rows="20" name='newsMessage' />
        </div>
        <button type='submit' className='btn btn-primary right'>Post Message</button>
      </form>
    )
  }
}

export default reduxForm({
  destroyOnUnmount: false,
  form: 'addNewsForm'
})(AddNewsForm);