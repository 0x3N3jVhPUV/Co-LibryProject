import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
      const experience = this.props.experience.map(exp => (
          <tr key={exp._id}>
              <td>{exp.company}</td>
              <td>{exp.title}</td>
              <td>
                  <Moment format="DD/MM/YYYY">{exp.from}</Moment> - {exp.to === '' ? ('Now') : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
              </td>
              <td>
                  <button onClick={this.onDeleteClick.bind(this, exp._id)}
                          className="btn btn-danger">Supprimer
                  </button>
              </td>
          </tr>
      ))
    return (
    <div> 
        <h4 className="mb-4">Experience</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Compagnie</th>
                        <th>Poste</th>
                        <th>année</th>
                        <th></th>
                    </tr>
                        {experience}
                </thead>
            </table>
      </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience} )(Experience);