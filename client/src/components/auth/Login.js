import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      passport: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }    

    if(nextProps.errors) {
      this.setState({errors: nextProps.errors}); 
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state; 

    return (
      <div className="login">
        <div className="fullscreen-video-wrap">
          <video src="https://www.videvo.net/videvo_files/converted/2014_08/preview/Gatwick_Airport_1Videvo_1.mov32092.webm"
            autoPlay={true} loop={true}>
          </video>
        </div>
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Se connecter</h1>
                <p className="lead text-center">Connectez-vous à votre compte Co-libry</p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                   
                  <TextFieldGroup
                    placeholder="Mot de passe"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);