import axios from "axios";
//import { logoutUser } from "../actions/authActions";

import { 
    GET_PROFILE, 
    GET_ERRORS, 
    PROFILE_LOADING, 
    CLEAR_CURRENT_PROFILE,
    SET_CURRENT_USER
} from './types'
import { logoutUser } from "./authActions";

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
            .catch(err => 
                dispatch({
                    type: GET_PROFILE,
                    payload: {}
                }));
}

// Create profile
export const createProfile = (profileData, history) => dispatch => {
    //dispatch(setProfileLoading());
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Add Experience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Add Education
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post('/api/profile/education', eduData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Delete Experience
export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Delete Education
export const deleteEducation = (id) => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

//Delete Account and profile 
export const deleteAccount = () => dispatch => {
    if (window.confirm('Etes-vous sûre?')) {
        axios
            .delete('/api/profile')
            .then(res =>
                dispatch(logoutUser()),
                dispatch({
                    type: CLEAR_CURRENT_PROFILE
                }),
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                }))
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }));
    }
};

//Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    };
};

//Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

