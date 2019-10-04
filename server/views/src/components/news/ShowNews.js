import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNews } from '../../actions';

class showNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }
  async componentDidMount() {
    try {
      await this.props.fetchNews();
      this.setState({ isLoading: false });
    }catch(err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  }

  renderNews() {
    if(this.state.isLoading) {
      return "Please Wait..."
    }else {
      return this.props.news.map(news => {
        return (
          <div key={news.id} className='news-section'>
            <div className='news-header'>
              <div style={{ display: 'inherit' }}>
                <h6>{news.subject}</h6>
                <h6 className='news-date'>{new Date(news.createdAt).toLocaleDateString()}</h6><br />
              </div>
              <div>
                <p>Posted By {news.Profile.firstName} {news.Profile.lastName}</p>
              </div>
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
        <h4>Announcements</h4>
        <hr/>
        <div className='news-scroll'>
          {this.renderNews()}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ news }){
  console.log({ news })
  return({ news: news.news })
}

export default connect(mapStateToProps, { fetchNews })(showNews);