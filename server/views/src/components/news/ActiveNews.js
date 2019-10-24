import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { trashArticle } from '../../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

class ActiveNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      isLoading: true
    }
  }

  async componentDidMount(){
    try {
      const newsArticles = await axios.get(`/news/${this.props.user.id}/articles`)

      this.setState({
        articles: newsArticles.data.articles,
        isLoading: false
      });
    }catch(err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  }

  async handleClick(id) {
    await this.props.viewEditNews(this.props.auth.id, id);
  }

  handleDelete(id) {
    let filteredArticles = this.state.articles.filter(article => article.id !== id)
    this.setState({ articles: filteredArticles})
    console.log(this.state.articles)
    this.props.trashArticle(id, this.props.auth.id);
  }

  renderArticles() {
    return this.state.articles.map(articles => {
      return (
        <div key={articles.id} className='news-section' id={articles.id}>
          <div className={articles.trash ? 'news-header trash' : 'news-header'}>
            <h6>{articles.subject}</h6>
            <div id='coordinator-news-head'>
              <Link to={`/${this.props.user.id}/articles/${articles.id}/edit`}
                className='btn edit-btn' 
                onClick={() => this.handleClick(articles.id)} >
                  <FontAwesomeIcon icon={faPencilAlt} />
              </Link>
              <button className='btn delete-btn' id='coordinator-news-delete' onClick={() => this.handleDelete(articles.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
          <div className='news-body'>
            {articles.message}
          </div>
        </div>
      )
    })
  }

  render() {
    return this.renderArticles();
  }
}

const mapStateToProps = ({ user }) => {
  return { user }
}

export default connect(mapStateToProps, { trashArticle })(ActiveNews);