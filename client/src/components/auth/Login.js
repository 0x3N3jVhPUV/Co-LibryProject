import React, { Component } from 'react'

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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log(user);
  }

  render() {
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
                  <div className="form-group">
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      placeholder="Email Address" 
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                      value={this.state.password} 
                      onChange={this.onChange}
                      />
                  </div>
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

export default Login;