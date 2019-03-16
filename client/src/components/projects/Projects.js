import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
//import ProfileItem from './ProfileItem'
import ProjectsForm from './ProjectsForm'
import { addProject } from '../../actions/projectsAction'

class Projects extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <ProjectsForm />
                </div>
            </div>
        </div>
      </div>
    )
  }
}


Projects.propTypes = {
    addProjects: PropTypes.func.isRequired,
    projects: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    projects: state.projects
})

export default connect(mapStateToProps, { addProject })(Projects);