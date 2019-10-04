import React, { Component } from 'react';

class Messages extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
    this.timer =  null;
  }
  
  componentDidMount() {
    this.setState({ show: true })
  }

  setTimeout() {
    var options = {
      iterations: 1,
      iterationStart: 0,
      delay: 4000,
      endDelay: 0,
      direction: 'alternate',
      duration: 700,
      fill: 'forwards',
      easing: 'ease-out',
    }
  
    var keyframes = [
      { transform: 'translateY(0) scaleY(1) scaleX(1)',
      transformOrigin: '50% 50%', filter: 'blur(0)', opacity: 1 },
      { transform: 'translateY(-10px) scaleY(.1) scaleX(1)', transformOrigin: '50% 0%', filter: 'blur(0px)', opacity: 0 },
    ]
    
    let alert = document.querySelector('.alert');
      
    if(alert !== null){
      this.timer = setTimeout(function(){
        alert.remove();
      }, 4500);
      alert.animate(keyframes, options);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  renderMessage() {
    let message = this.props.message
    let type = this.props.type
    
    if(type && message) {
      return(
        <div className={`alert alert-${type} alert-dismissable fade show`}  role='alert'>
          <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
          {message}
        </div>
      )
    }
    return null;
  }

  render() {
    if(this.state.show) {
      return (
        <div>
          {this.renderMessage()}
          {this.setTimeout()}
        </div>
      )
    }
    return (<div></div>)
  }
}


export default Messages;