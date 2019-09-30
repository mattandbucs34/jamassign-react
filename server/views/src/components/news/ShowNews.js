import React, { Component } from 'react';
import { connect } from 'react-redux';

class showNews extends Component {
  renderNews() {
    if(!this.props.news) {
      return
    }else {
      return this.props.news.map(news => {
        return (
          <div key={news.id} className='news-section'>
            <div className='news-header'>
              <h6>{news.subject}</h6>
              <h6 className='news-date'>{new Date(news.createdAt).toLocaleDateString()}</h6>
            </div>
            <div className='news-body'>{news.message}</div>
          </div>
        )
      })
    }
  }

  render() {
    return(
      <div>
        <h4>Recent News</h4>
        <hr/>
        <div className='news-scroll'>
          {this.renderNews()}
        </div>
      </div>
    )
  }
}

function mapState({ news }){
  return({ news: news.news })
}

export default connect(mapState)(showNews);