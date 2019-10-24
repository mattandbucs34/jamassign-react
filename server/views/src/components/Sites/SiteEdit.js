import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import fiftyStates from '../fifty_states/fiftyStates';
import { editSite } from '../../actions';

const SiteEdit = (props) => {
  console.log(props);
  const { site, user, views } = props;
  const [updatedSite, setUpdatedSite] = useState({});
  
  const renderFiftyStates = () => {
    return _.map(fiftyStates, states => {
      return (
        <option key={states.value}  value={states.value} >{states.value}</option>  
      )
    })
  }

  const handleChange= (e) => {
    let setForm = Object.assign({}, updatedSite);
    setForm[e.target.name] = e.target.value;
    setUpdatedSite(setForm);
    console.log(updatedSite)
  }

  const handleEditClick = () => {
    props.editSite(site.id, updatedSite);
    props.showDashboard()
  }

  if(!user.loggedIn) {
    return <Redirect to='/' />
  }else if(user.role !== 'coordinator' || views.status === 401) {
    return <Redirect to='/dashboard' />
  }else {
    return (
      <div>
        <div>
        <h2>Edit Site: {site.name}</h2>
        <hr />
        </div>
        <form onSubmit={props.handleSubmit} >
          <div>
            <div className='form-group'>
              <label htmlFor='siteName'>Site Name:</label>
              <input type='text' className='form-control' name='name' defaultValue={site.name}  onChange={handleChange.bind(this)} />
            </div>
            <div className='form-group'>
              <label htmlFor='address'>Address:</label>
              <input type='text' className='form-control' name='address' defaultValue={site.address} onChange={handleChange.bind(this)} />
            </div>
            <div className='form-group'>
              <label htmlFor='city'>City:</label>
              <input type='text' className='form-control' name='city' defaultValue={site.city} onChange={handleChange.bind(this)}/>
            </div>
            <div className='form-group'>
              <div>
                <label htmlFor='state'>State:</label>
                <select className='form-control' name='state' 
                defaultValue={site.state}
                onChange={handleChange.bind(this)}>{renderFiftyStates()}</select>
              </div>
              <div>
                <label htmlFor='zip'>Zip:</label>
                <input type='number' name='zip' className='form-control' defaultValue={site.zip} onChange={handleChange.bind(this)}/>
              </div>
            </div>
          </div>
          <div>
            <button className='btn btn-outline-danger' onClick={() => props.showDashboard()}>Cancel</button>
            <button type='button' className='btn btn-primary' onClick={  handleEditClick}>Finish</button>
          </div>
        </form>
      </div>
      )
  }
}

const mapStateToProps = ({ user, views }) => {
  return { user, views }
}

export default connect(mapStateToProps, { editSite })(SiteEdit);