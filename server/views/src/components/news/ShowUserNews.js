import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../actions'


class UserNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      isLoading: true
    }
  }
  

  async componentDidMount(){
    try {
      await this.props.fetchUser();
      await this.props.viewNewsDashboard();
      const newsArticles = await axios.get(`/news/${this.props.auth.id}/articles`)

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
            {articles.subject}
            <div id='coordinator-news-head'>
              <Link to={`/${this.props.auth.id}/articles/${articles.id}/edit`} 
                className='btn article-options' 
                onClick={() => this.handleClick(articles.id)} >
                  <i className='fas fa-pencil-alt'></i>
              </Link>
              <button className='btn article-options' id='coordinator-news-delete' onClick={() => this.handleDelete(articles.id)}><i className='far fa-trash-alt'></i></button>
            </div>
          </div>
          <div className='news-body'>
            {articles.message}
          </div>
        </div>
      )
    })
  }

  async showActiveNews() {
    try {
      const activeNews = await axios.get(`/news/${this.props.auth.id}/articles`);
      this.setState({ articles: activeNews.data.articles });
    }catch(err) {
      console.log(err)
    }
  }

  async showTrashNews() {
    try {
      const trashNews = await axios.get(`/news/${this.props.auth.id}/articles/trash`);
      this.setState({ articles: trashNews.data.articles });
    }catch(err) {
      console.log(err)
    }
  }

  renderContent() {
    if(this.state.isLoading || !this.props.auth) {
      return 'Please Wait...';
    }else if(!this.props.views.auth) {
      return <Redirect to='/' />
    }else {
      return (
        <div>
          <h2 className='page-heading'>News Dashboard</h2>
          <div>
            <div className='jam-form'>
              <div style={{ display: 'inline-block' }}>
                <div>
                  <button type='button' className='btn btn-link' 
                    onClick={() => {this.showActiveNews()}}
                  >
                    Show Active
                  </button>
                  <button type='button' className='btn btn-link' 
                    onClick={() => {this.showTrashNews()}}
                  >
                    Show Deleted
                  </button>
                </div>
                <div>
                  {this.renderArticles()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  render() {
    return this.renderContent();
  }
}

const mapStateToProps = ({ auth, views, news }) => {
  return { auth, views, news }
}

export default connect(mapStateToProps, actions)(withRouter(UserNews));