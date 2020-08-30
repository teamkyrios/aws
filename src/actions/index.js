export const AccessRights = {
	NONE: 'NONE',
	STAFF: 'STAFF',
	ADMINISTRATOR: 'ADMINISTRATOR',
};

export const LoginOptions = {
	LOGIN: 'LOGIN',
	SIGN_OUT: 'SIGN_OUT',
};

/**
 *
 * @param {*} values is an object from LoginPage form submission.
 */
export const authenticateUser = (isAuthenticated, accessRights) => {
	return {
		type: 'LOGIN',
		isAuthenticated: isAuthenticated,
		accessRights: accessRights,
	};
};

export const signOutUser = () => {
	return {
		type: 'SIGN_OUT',
	};
};

/**
 * Get visitors from backend and store in redux.
 */
export const storeVisitors = (allVisitors) => {
	return {
		type: 'STORE_VISITORS',
		allVisitors: allVisitors,
	};
};
