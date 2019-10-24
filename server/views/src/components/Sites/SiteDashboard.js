import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { destroySite, fetchAllSites } from '../../actions';

import SiteCreate from './SiteCreate';
import SiteEdit from './SiteEdit';
import SiteList from './SiteList';

const SiteDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [siteToEdit, setSiteToEdit] = useState({});

  const handleEditClick = (e) => {
    const siteToEdit = props.sites.find(({id}) => id === e);
    console.log(siteToEdit);
    setSiteToEdit(siteToEdit);
    setIsEditing(true);
  }

  if(!props.user.loggedIn) {
    return <Redirect to='/' />
  }else if (props.user.role !== 'coordinator') {
    return <Redirect to='/dashboard' />
  }else if(isCreating) {
    return <SiteCreate showDashboard={() => setIsCreating(false)}/>
  }else if(isEditing) {
    return <SiteEdit site={siteToEdit} showDashboard={() => setIsEditing(false)} />
  }else {
    return <SiteList 
      sites={props.sites}
      userId={props.user.id}
      onCreateClick={() => setIsCreating({ isCreating: true })}
      onEditClick={(e) => handleEditClick(e)}
    />
  }
}

const mapStateToProps = ({ sites, user, views }) => {
  
  return { sites: sites.sites,
    user,
    views
  };
}

export default connect(mapStateToProps, { destroySite, fetchAllSites })(SiteDashboard);