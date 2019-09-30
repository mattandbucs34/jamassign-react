import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewNewsDashboard } from '../../actions'

import ShowUserNews from './ShowUserNews';


class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleId: 0,
      showNewsEdit: false
    }
  }
  
  render() {
    return <ShowUserNews />
  }
}

const mapStateToProps = ({ auth, views }) => {
  return { auth, views }
}

export default connect(mapStateToProps, { viewNewsDashboard })(withRouter(News));