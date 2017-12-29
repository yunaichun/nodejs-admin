import { combineReducers } from 'redux';
import reduxThunkReducer from './examples/reduxThunkReducer';
import reduxPromiseReducer1 from './examples/reduxPromiseReducer1';
import reduxPromiseReducer2 from './examples/reduxPromiseReducer2';
import loginReducer from './loginReducer';

export default combineReducers({
	reduxThunkReducer,
	reduxPromiseReducer1,
	reduxPromiseReducer2,
	loginReducer // store.GetState()
}); 
