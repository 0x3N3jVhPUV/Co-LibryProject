import React, { Component } from 'react';
import { connect } from 'react-redux';
//import PropTyoes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Experience extends Component {
  render() {
      const experience = this.props.experience.map(exp => (
          <tr key={exp._id}>
              <td>{exp.company}</td>
              <td>{exp.title}</td>
              <td>{exp.from} - {exp.to}</td>
              <td><button className="btn btn-danger">Supprimer</button></td>
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

export default connect(null)(withRouter(Experience));