import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';
//import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.3/node_modules/redux';

const initialState = {
    profile: null,
    profiles: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null,
            }    
        default:
            return state;
    }
};