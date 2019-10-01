import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { destroyArticle } from '../../actions'

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
      // await this.props.fetchUser();
      // await this.props.viewNewsDashboard();
      const newsArticles = await axios.get(`/news/${this.props.auth.id}/articles/trash`)

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

  permDelete(id) {
    let filteredArticles = this.state.articles.filter(article => article.id !== id)
    this.setState({ articles: filteredArticles})
    console.log(this.state.articles)
    this.props.destroyArticle(id, this.props.auth.id);
  }

  renderArticles() {
    return this.state.articles.map(articles => {
      return (
        <div key={articles.id} className='news-section' id={articles.id}>
          <div className={articles.trash ? 'news-header trash' : 'news-header'}>
            {articles.subject}
            <div id='coordinator-news-head'>
              <Link to={`/${this.props.auth.id}/articles/${articles.id}/edit`} 
                className='btn article-options' 
                onClick={() => this.handleClick(articles.id)} >
                  <i className='fas fa-pencil-alt'></i>
              </Link>
              <button className='btn article-options' id='coordinator-news-delete' onClick={() => this.permDelete(articles.id)}><i className='far fa-trash-alt'></i></button>
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

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { destroyArticle })(ActiveNews);