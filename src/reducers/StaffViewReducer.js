import { storeVisitors } from '../actions';
import { object } from 'yup';

const initialState = {
	allVisitors: {},
};

const visitors = (state = initialState, action) => {
	switch (action.type) {
		case 'STORE_VISITORS':
			return Object.assign({}, state, { allVisitors: action.allVisitors });
		default:
			return state;
	}
};

export default visitors;
