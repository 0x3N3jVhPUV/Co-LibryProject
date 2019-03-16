import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addPost } from '../../actions/projectsAction';
//import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import isEmpty from '../../validation/is-empty';


class ProjectItem extends Component {
    render() {
        const { project } = this.props;
        return (
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-2">
                        <img src={project.user.avatar} alt="" className="rounded-cercle" />
                    </div>
                    <div className="col-lg-6 col-md-4 col-8">
                        <h3>{project.user.name}</h3>
                        <p>
                            {project.status} {isEmpty(project.company ? null : (<span>at {project.company}</span>))}
                        </p>
                        <p>
                            {isEmpty(project.location) ? null : (<span>{project.location}</span>)}
                        </p>
                        <Link to={`/project/${project.handle}`} className="btn btn-info">
                            Vu du project
                </Link>
                    </div>
                    <div className="col-md-4 d-none d-md-block">
                        <h4>Compétences</h4>
                        <ul className="list-group">
                            {project.skills.slice(0, 4).map((skill, index) => (
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1" />
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

ProjectItem.propTypes = {
    project: PropTypes.object.isRequired
}

export default ProjectItem;