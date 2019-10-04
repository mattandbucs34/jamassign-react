import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import formFields from './formFields';
import fiftyStates from '../fifty_states/fiftyStates';
import * as actions from '../../actions';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      profile: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }
  

  async componentDidMount() {
    try{
      await this.props.fetchUser();
      await this.props.viewAccount(this.props.auth.id);
      this.setState({
        isLoading: false,
        profile: this.props.profile.profile.profile
      })
    }catch(err) {
      console.log(err)
      this.setState({ isLoading: false })
    }
  }

  renderFiftyStates() {
    return _.map(fiftyStates, states => {
      return (
        <option key={states.value}  value={states.value} >{states.value}</option>  
      )
    })
  }

  renderFields() {
    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name} className='form-group'>
          <label htmlFor={name}>{label}</label>
          <input type='text' className='form-control' name={name} value={this.state.profile[name]} onChange={this.handleChange} />
        </div>
      )
    })
  }
  
  handleChange(e) {
    let updatedProfile = Object.assign({}, this.state);
    updatedProfile.profile[e.target.name] = e.target.value;

    this.setState(updatedProfile)
    console.log(this.state);
  }

  renderContent() {
    if(this.state.isLoading) {
      return "Please Wait..."
    }else if(!this.props.auth) {
      return <Redirect to='/' />
    }else {
      return (
        <div>
          <h2 className='page-heading'>User Account</h2>
          <hr />
          <div className='row'>
            <form className='col-md-8 col-10 jam-form profile-form' onSubmit={()=> this.props.editProfile(this.state.profile, this.props.auth.id)} >
              {this.renderFields()}
              <div className="row">
                <div className='form-group col-md-4 col-4'>
                  <label htmlFor='state'>State:</label>
                  <select name='state' className="form-control" value={this.state.profile.state} onChange={this.handleChange}>
                    {this.renderFiftyStates()}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='zip'>Zip Code: <small>#####</small></label>
                  <input className='form-control' name='zip' type='text' value={this.state.profile.zip} onChange={this.handleChange} />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='mobile'>Mobile Number: <small>###-###-####</small></label>
                <input className='form-control' name='mobile' value={this.state.profile.mobile} type='tel' onChange={this.handleChange} />
              </div>
              <div className='button-right'>
                <button type='button' onClick={this.props.cancelEdit} className='btn btn-outline-danger'>Cancel</button>
                <button type='submit' className='btn btn-danger right'>Finish</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }

  render() {
    return this.renderContent()
  }
}

let mapState = ({ auth, profile, views }) => {
  return { auth, profile, views }
}

function test() {
  console.log("this is a test")
}
export default connect(mapState, actions)(withRouter(EditProfile));