import _ from 'lodash';
import React from 'react';
import fiftyStates from './fiftyStates';

export default({ input}) => {
  return _.map(fiftyStates, states => {
    return (
      <option {...input} key={states.value}  value={states.value} >{states.value}</option>  
    )
  })
}