import { AccessRights, LoginOptions, authenticateUser } from '../actions';

const initialState = {
	isAuthenticated: false,
	accessRights: AccessRights.NONE,
};

const login = (accessRights) => {
	return {
		isAuthenticated: true,
		accessRights: accessRights,
	};
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case LoginOptions.LOGIN:
			return login(action.accessRights);
		case LoginOptions.SIGN_OUT:
			return state;
		default:
			return state;
	}
};

export default auth;
