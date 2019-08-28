import React from 'react';
import FiftyStatesOption from './FiftyStatesOption';

export default({meta: {error, touched }}) => {
  return (
    <div className='form-group col-md-4'>
      <label htmlFor='state'>State:</label>
      <select  className='form-control' name='state' >
        <FiftyStatesOption />
      </select>
      <div>
        {touched && error}
      </div>
    </div>
  )  
}