import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TopNavbar from './components/TopNavbar';
import AnnouncementPage from './components/AnnouncementPage';
import LoginPage from './components/LoginPage';
import AdminView from './components/admin/AdminView';

// Keeps track of whether user is authenticated as staff / admin.
const authObj = {
	isAuthenticated: false,
	authenticate(newLocation) {
		authObj.isAuthenticated = true;
		setTimeout(newLocation, 1000); // fake async, swap with actual authentication
	},
	signout(newLocation) {
		authObj.isAuthenticated = false;
		setTimeout(newLocation, 1000);
	},
};

// Callback function to change state of authObj
const authenticateUser = (loginFormParams, ifAdmitted) => {
	if (true) {
		// Access granted
		authObj.isAuthenticated = true;
		authObj.authenticate(ifAdmitted);
	} else {
	}
	alert(loginFormParams);
};

export default function App() {
	return (
		<Router>
			<TopNavbar />
			<Switch>
				<PrivateRoute path='/administrator'>
					<AdminView />
				</PrivateRoute>
				<Route path='/announcements/'>
					<AnnouncementPage />
				</Route>
				<Route path='/login/'>
					<LoginPage authenticate={authenticateUser} />
				</Route>
				<Route path='/'>
					<LandingPage />
				</Route>
			</Switch>
		</Router>
	);
}

/**
 * Only grant access to these pages if user is logged in as administrator or staff
 * Otherwise, redirect to login.
 */
const PrivateRoute = ({ children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				authObj.isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
