import React, { Component } from 'react';

class Messages extends Component {
  componentDidMount() {
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 4500);

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

    document.querySelector('.alert').animate(keyframes, options);
  }

  renderMessage() {
    let message = this.props.message
    let type = this.props.type

    if(type && message){
      return(
        <div className={`alert alert-${type} alert-dismissable fade show`}  role='alert'>
            <button type='button' className='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
            {message}
          </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
      </div>
    )
    
  }
}

export default Messages;