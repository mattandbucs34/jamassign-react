import React, { Component } from 'react';
import { connect } from 'react-redux';

class showNews extends Component {
  renderNews() {
    if(!this.props.news) {
      return
    }else {
      return this.props.news.map(news => {
        return (
          <div key={news.id}>
            <div>
              <h5>{news.subject}</h5>
              <h5>{new Date(news.createdAt).toLocaleDateString()}</h5>
            </div>
            <hr />
            <div>{news.message}</div>
          </div>
        )
      })
    }
  }

  render() {
    return(
      <div>
        <h2>Recent News</h2>
        <hr/>
        {this.renderNews()}
      </div>
    )
  }
}

function mapState({ news }){
  return({ news: news.news })
}

export default connect(mapState)(showNews);