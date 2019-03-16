import React, { Component } from 'react'
import Moment from 'react-moment'
import profileReducer from '../../reducers/profileReducer';
class ProfileCreds extends Component {
    render() {
        const { experience, education } = this.props;

        const expItems = experience.map(exp => (
            <li key={exp._id} className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
                    <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
                    {exp.to === '' ? (' en cours') : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)}
                </p>
                <p><strong>Poste:</strong> {exp.title}</p>
                <p>
                    {exp.location === '' ? null : (<span><strong>Lieu: </strong>{exp.location}</span>)}
                </p>
                <p>
                    {exp.description === '' ? null : (<span><strong>Description: </strong>{exp.description}</span>)}
                </p>
            </li>
        ));

        const eduItems = education.map(edu => (
            <li key={edu._id} className="list-group-item">
                <h4>{edu.school}</h4>
                <p>
                    <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
                    {edu.to === null ? (' maintenant') : (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
                </p>
                <p><strong>Diplome:</strong> {edu.degree}</p>
                <p>
                    <strong>Domaine d'étude:</strong> {edu.fieldofstudy}
                </p>
                <p>
                    {edu.description === '' ? null : (<span><strong>Description: </strong>{edu.description}</span>)}
                </p>
            </li>
        ));
        return (
            <div className="row">
                <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    {expItems.length > 0 ? (
                        <ul className="list-group">{expItems}</ul>
                    ) : (
                        <p className="text-center">Aucune expérience listée</p>
                    )}
                </div>

                <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    {eduItems.length > 0 ? (
                        <ul className="list-group">{eduItems}</ul>
                    ) : (
                            <p className="text-center">Aucun parcourt académique listée</p>
                        )}
                </div>
            </div>
        )
    }
}

export default ProfileCreds;