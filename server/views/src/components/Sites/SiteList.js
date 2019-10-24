import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';

import {fetchAllSites, destroySite} from '../../actions';

function SiteList(props) {
  const [isLoading, setLoading ] = useState(true);

  useEffect(
    () => {
      console.log(props);
      
      props.fetchAllSites();
      setLoading(false);
    }, []
  )

  function renderSites(){
    const { destroySite, onEditClick, sites, userId } = props;
    if(sites === undefined || sites.length === 0 || _.isEmpty(sites)) {
      return(
        <div>
          <div>
            <h6>There are no sites. Please add one!</h6>
          </div>
        </div>
      )
    }else {
      return sites.map(site => {
        return (
          <div key={site.id} className='display-row'>
            <div className='col-md-8 col-6'>
              {site.name}<br />
              {site.address}, {site.state} {site.zip}
            </div>
            <div style={{ 'display': 'flex'}} className='col-md-4'>
              <button type='button' /* to={`/sites/${site.id}/edit`}  */
                className='btn edit-btn'
                style={{ 'marginLeft': 'auto'}}
                onClick={() => onEditClick(site.id)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button type='button' className='btn' onClick={() => destroySite(site.id, userId)}>
              <FontAwesomeIcon icon={faTrashAlt} /> </button>
            </div>
          </div>
        )
      })
    }
  }

  if(isLoading) {
    return (
      <div>Please Wait...</div>
    )
  }else if(!isLoading) {
    return (
      <div>
        <h2>List of Sites</h2>
        <hr/>
        <div className='col-md-6 list-group'>
          {renderSites()}
        </div>
        <div>
          <button type='button' className='btn btn-primary' onClick={props.onCreateClick} >New Site</button>
        </div>
      </div>
    )
  }
}

export default connect(null, {destroySite, fetchAllSites})(SiteList);