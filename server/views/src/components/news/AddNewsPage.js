import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createNews, viewAddNews } from '../../actions';


import AddNewsForm from './AddNewsForm';

class AddNewsPage extends Component {
	constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }

	createNews(formValues, history) {
		this.props.createNews(this.props.user.id, formValues, history);
		this.props.onCreateNews()
	}

	renderContent() {
		const { formValues, history } = this.props;
		if(!this.props.views.auth) {
			return <Redirect to='/' />
		}else {
			return (
				<div>
					<h4 className='page-heading'>Add News</h4>
					<AddNewsForm onSubmit={() => this.createNews(formValues, history)} />
				</div>
			);
		}
	}

	render() {
		return this.renderContent()
	}
}

function mapStateToProps({ form, user, views }) {
  return {
		user,
		formValues: form.addNewsForm,
		views
  }
}

export default connect(mapStateToProps, { createNews, viewAddNews })(withRouter(AddNewsPage));