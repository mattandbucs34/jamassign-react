import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editArticle, viewEditNews } from '../../actions';

class EditNews extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      article: [],
      isLoading: true 
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  async componentDidMount() {
    try {
      await this.props.viewEditNews(this.props.user.id, this.props.match.params.articleId);
      this.setState({ article: this.props.views.article, isLoading: false });
      console.log("Mounted")
    }catch(err) {
      console.log(err);
      this.setState({ isLoading: false})
    }
  }

  handleChange(e) {
    let editArticle = Object.assign({}, this.state);
    editArticle.article[e.target.name] = e.target.value;

    this.setState(editArticle);
  }

  renderContent() {
    if(this.state.isLoading) {
      return "Please Wait..."
    }else if (!this.props.views.user) {
      return <Redirect to='/' />
    }else {
      return (
        <div>
          <div>
            <h2>Edit Article</h2>
          </div>
          <div>
            <form onSubmit={this.props.handleSubmit} className='jam-form' >
              <div className='form-group'>
                <label htmlFor='subject'>Subect:</label>
                <input type='text' className='form-control' name='subject' value={this.props.views.article.subject} onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor='message'>Message:</label>
                <textarea className='news-msg form-control' name='message' value={this.props.views.article.message} onChange={this.handleChange} />
              </div>
              <Link to='/articles' className='btn btn-outline-danger'>Go Back</Link>
              <div className='button-right'>
                <button 
                  type='submit' 
                  className='btn btn-primary right' 
                  onClick={() => this.props.editArticle(
                    this.state.article,
                    this.props.match.params.articleId,
                    this.props.user.id
                  )}>Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
  
  render() {
    return this.renderContent();
  }
}

const mapStateToProps = ({ news, user, views }) => {
  return { news, user, views }
}

export default connect(mapStateToProps, { editArticle, viewEditNews })(withRouter(EditNews));