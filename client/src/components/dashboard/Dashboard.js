import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
      this.props.getCurrentProfile();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('login');
    }
  }          

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
        dashboardContent = <Spinner />
    } else {
      //Check login user has profile data
      if(Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div>
              <p className="lead text-muted">Bienvenue { user.name }</p>
              <p>Vous n'avez pas encore configuré votre profile</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Créer un profile
              </Link>
          </div>
        );
      }
    }

    return (
        <div className="dashboard">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4">Dashboard
                    {dashboardContent}
                  </h1>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);