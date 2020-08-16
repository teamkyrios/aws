import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TopNavbar from './components/TopNavbar';
import AnnouncementPage from './components/AnnouncementPage';
import LoginPage from './components/LoginPage';
import AdminView from './components/admin/AdminView';

const accessRights = { none: 'NONE', staff: 'STAFF', administrator: 'ADMINISTRATOR' };

const authObj = {
	isAuthenticated: false,
	accessRights: accessRights.none,
	authenticate(cb) {
		authObj.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		authObj.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

export default function App() {
	// Callback function to change state of authObj
	const authenticateUser = (loginFormParams, ifAdmitted) => {
		if (true) {
			authObj.authenticate(ifAdmitted);
		} else {
		}
		alert(loginFormParams);
	};

	/**
	 * Only grant access to these pages if user is logged in as administrator or staff
	 * Otherwise, redirect to login.
	 */
	const PrivateRoute = ({ children, ...rest }) => {
		alert(authObj.isAuthenticated);
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

	return (
		<Router>
			<TopNavbar />
			<Switch>
				<Route exact path='/'>
					<LandingPage />
				</Route>
				<Route path='/login'>
					<LoginPage authenticate={authenticateUser} />
				</Route>
				<Route path='/announcements'>
					<AnnouncementPage />
				</Route>
				<PrivateRoute path='/administrator'>
					<AdminView />
				</PrivateRoute>
			</Switch>
		</Router>
	);
}
