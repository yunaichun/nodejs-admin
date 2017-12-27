import { combineReducers } from 'redux';
import asyncReducer from './asyncReducer';
import userReducer from './userReducer';

export default combineReducers({
	asyncData: asyncReducer, // store.GetState()
	users: userReducer // store.GetState()
}); 
