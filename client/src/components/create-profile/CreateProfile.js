import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
   constructor(props) {
    super(props);
    this.state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }
   }    

class CreateProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('login');
    }
  }     

  render() {
    return (
      <div className='create-profile'>
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Créer votre profile</h1>
                    <p className="lead text-center">
                        Ajoutez des informations pour mettre votre profile opérationnel
                    </p>
                    <small className="d-block pb-3">* = required fields</small>
                </div>
            </div>
        </div>        
      </div>
    )
  }
}

CreateProfile.protoTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired      
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);