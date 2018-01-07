import { combineReducers } from 'redux';
import reduxThunkReducer from './asyncExp/reduxThunkReducer';
import reduxPromiseReducer1 from './asyncExp/reduxPromiseReducer1';
import reduxPromiseReducer2 from './asyncExp/reduxPromiseReducer2';
import loginReducer from './loginReducer';

export default combineReducers({
	reduxThunkReducer,
	reduxPromiseReducer1,
	reduxPromiseReducer2,
	loginReducer // store.GetState()
}); 
