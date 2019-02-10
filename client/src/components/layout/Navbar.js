import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    };

  render() {
      const { isAuthenticated, user } = this.props.auth;

      const authLinks = (
          <ul className="navbar-nav ml-auto">              
              <li className="nav-item">
                <a 
                    href=" " 
                    onClick={this.onLogoutClick.bind(this)} 
                    className="nav-link">
                    <img 
                        className="rounded-circle"
                        src={user.avatar} 
                        alt={user.name}
                        style={{ width: '25px', marginRight: '5px' }}
                        title="Vous devez avoir un Gravatar connecté à votre email pour afficher une image."
                    />{' '}
                    Se déconnecter
                </a>
              </li>
          </ul>
      );

      const guestLinks = (
          <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link className="nav-link" to="/register">S'inscrire</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/login">Se connecter</Link>
              </li>
          </ul>
      );



    return (
         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Co-libry</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/carrier"> Transporter un colis</Link>
                        </li>
                        <Link className="nav-link" to="/sender"> Envoyer un colis</Link>
                    </ul>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    )
  }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);