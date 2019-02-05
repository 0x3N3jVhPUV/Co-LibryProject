import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            passport: '',
            passport2: '',
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        axios
            .post('/api/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({errors: err.response.data}));
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="fullscreen-video-wrap">
                    <video src="https://www.videvo.net/videvo_files/converted/2014_08/preview/Gatwick_Airport_1Videvo_1.mov32092.webm"
                        autoPlay={true} loop={true}>
                    </video>
                </div>
                <div className="dark-overlay landing-inner text-light">                
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">S'inscrire</h1>
                                <p className="lead text-center">Creez votre compte Co-libry</p>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className={classnames("form-control form-control-lg", {"is-invalid": errors.name})}
                                            placeholder="Nom" 
                                            name="name" 
                                            value={this.state.name} 
                                            onChange={this.onChange}
                                            />
                                            {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="email" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.email })}
                                            placeholder="Addresse e-mail" 
                                            name="email" 
                                            value={this.state.email} 
                                            onChange={this.onChange}
                                            />
                                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                        <small className="form-text text-muted">Ce site utilise Gravatar, donc si vous voulez une image de profile, vous pouvez utilisez un email Gravatar</small>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.password })}
                                            placeholder="Mot de passe" 
                                            name="password" 
                                            value={this.state.password} 
                                            onChange={this.onChange}
                                            />
                                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password" 
                                            className={classnames("form-control form-control-lg", { "is-invalid": errors.password2 })}
                                            placeholder="Confirmation du mot de passe" 
                                            name="password2" 
                                            value={this.state.password2} 
                                            onChange={this.onChange}
                                            />
                                            {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
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

export default Register;