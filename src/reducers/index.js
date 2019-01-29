import { combineReducers } from 'redux';
import dataReducer from './dataReducer'
import userData from './userData'


const rootReducer = combineReducers({
    data : dataReducer,
    userData :userData
    });
    
    export default rootReducer;
    