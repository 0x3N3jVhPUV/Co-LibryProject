import { GET_PROJECT, GET_PROJECTS, PROJECT_LOADING, ADD_PROJECT, DELETE_PROJECT } from '../actions/types';
//import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

const initialState = {
    projects: [],
    project: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROJECT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload,
                loading: false
            };
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false
            };
        case ADD_PROJECT:
            return {
                ...state,
                project: null,
            };
        case DELETE_PROJECT:
            return {
                ...state,
                project: null,
            };    
        default:
            return state;
    }
};