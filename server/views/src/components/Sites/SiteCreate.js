import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import fiftyStates from '../fifty_states/fiftyStates';
import { createSite } from '../../actions';

const CreateSite = (props) => {
  const [siteForm, setSiteForm ] = useState({});
  
  const renderFiftyStates = () => {
    return _.map(fiftyStates, states => {
      return (
        <option key={states.value}  value={states.value} >{states.value}</option>  
      )
    })
  }

  const handleChange = (e) => {
    let setForm = Object.assign({}, siteForm);
    setForm[e.target.name] = e.target.value;
    setSiteForm(setForm);
  }

  const handleCreateClick = () => {
    props.createSite(siteForm);
    props.showDashboard();
  }

  if(!props.user.loggedIn) {
    return <Redirect to='/' />
  }else if(props.user.role !== 'coordinator') {
    return <Redirect to='/dashboard' />
  }else {
    return(
      <div>
        <form>
          <div>
            <div className='form-group'>
              <label htmlFor='siteName'>Site Name:</label>
              <input type='text' className='form-control' name='siteName' onChange={handleChange.bind(this)} />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address:</label>
              <input type='text' className='form-control' name='address' onChange={handleChange.bind(this)} />
            </div>
            <div className='form-group'>
              <label htmlFor='city'>City:</label>
              <input type='text' className='form-control' name='city' onChange={handleChange.bind(this)}/>
            </div>
            <div className='form-group'>
              <div>
                <label htmlFor='state'>State:</label>
                <select className='form-control' name='state' onChange={handleChange.bind(this)}>{renderFiftyStates()}</select>
              </div>
              <div>
                <label htmlFor='zip'>Zip:</label>
                <input type='number' name='zip' className='form-control' onChange={handleChange.bind(this)}/>
              </div>
            </div>
          </div>
          <div>
            <button className='btn btn-outline-danger' onClick={() => props.showDashboard()}>Cancel</button>
            <button type='button' className='btn btn-primary' onClick={ handleCreateClick}>Create</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
}

export default connect(mapStateToProps, { createSite })(withRouter(CreateSite));