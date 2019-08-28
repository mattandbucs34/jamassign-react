import React from 'react';

export default({ input, label, name, placeholder, type, meta: {error, touched }}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input {...input} className='form-control' type={type} placeholder={placeholder} />
      <div>
        {touched && error}
      </div>
    </div>
  )
}