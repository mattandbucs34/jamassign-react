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

	async componentDidMount() {
		console.log(this.props)
		try {
      await this.props.viewAddNews();
      this.setState({ isLoading: false })
    }catch(err) {
      this.setState({
        err,
        isLoading: false
      })
    }
	}

	createNews(formValues) {
		this.props.createNews(this.props.auth.id, formValues);
		this.props.onCreateNews()
	}

	renderContent() {
		const { createNews, formValues } = this.props;
		if(this.state.isLoading) {
			return "Please wait...";
		}else if(!this.props.views.auth) {
			return <Redirect to='/' />
		}else {
			return (
				<div>
					<h2 className='page-heading'>Add News</h2>
					<hr />
					<AddNewsForm onSubmit={() => this.createNews(formValues)} />
				</div>
			);
		}
	}

	render() {
		return this.renderContent()
	}
}

function mapStateToProps({ auth, form, views }) {
  return {
		auth,
		formValues: form.addNewsForm,
		views
  }
}

export default connect(mapStateToProps, { createNews, viewAddNews })(withRouter(AddNewsPage));