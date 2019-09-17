import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as actions from '../../actions/newsActions';


import AddNewsForm from './AddNewsForm';

class AddNewsPage extends Component {

	componentDidMount() {
		this.props.viewAddNews();
	}

	renderContent() {
		const { createNews, formValues, history } = this.props;
		console.log(this.props.news.auth)
		switch(this.props.news.auth) {
			case undefined:
				return null;
			default:
				return <Redirect to={{
          pathname: '/',
          state: { 
            referrer: '/add-news',
            type: 'warning',
            message: 'You must be logged in to view that'
            }
          }} />
			case true:
				return (
					<div>
						<h2>Add News</h2>
						<hr />
						<AddNewsForm onSubmit={() => createNews(formValues, history)} />
					</div>
				);
		}
	}

	render() {
		return(
			<div>
				{this.renderContent()}
			</div>
		)
		
		
	}
}

function mapStateToProps({ form, user, news }) {
	console.log({ news })
  return {
		formValues: form.addNewsForm,
		user,
		news
  }
}

export default connect(mapStateToProps, actions)(withRouter(AddNewsPage));