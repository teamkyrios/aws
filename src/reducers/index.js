import { combineReducers } from 'redux';
import auth from './AuthReducer';
import visitors from './StaffViewReducer';

export default combineReducers({
	auth,
	visitors,
});
