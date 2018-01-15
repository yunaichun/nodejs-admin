import { combineReducers } from 'redux';
import reduxThunkReducer from './asyncExp/reduxThunkReducer';
import reduxPromiseReducer1 from './asyncExp/reduxPromiseReducer1';
import reduxPromiseReducer2 from './asyncExp/reduxPromiseReducer2';
import loginReducer from './login/login';
import mockReducer from './mock/mock';
import userReducer from './user/user';
import catetoryReducer from './catetory/catetory';
import movieReducer from './movie/movie';

export default combineReducers({
	reduxThunkReducer,
	reduxPromiseReducer1,
	reduxPromiseReducer2,
	loginReducer, // store.GetState()
	mockReducer,
	userReducer,
	catetoryReducer,
	movieReducer
}); 
