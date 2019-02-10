import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';


class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('dashboard');
        }
    }

    render() {
    return (
         <div className="landing">
            <div className="fullscreen-video-wrap">
                <video src="https://www.videvo.net/videvo_files/converted/2017_04/preview/170422B_010_Airport_UHD.mp415526.webm"
                    autoPlay={true} loop={true}>
                </video>
            </div>

            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Co-libry
            </h1>
                            <p className="lead"> Transporter un colis à l'étranger n'a jamais été aussi simple.</p>
                            <hr />
                            <Link to="/register" className="btn btn-lg btn-info mr-2">S'inscrire</Link>
                            <Link to="/login" className="btn btn-lg btn-light">Se connecter</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
  }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);