import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TopNavbar from './components/TopNavbar';
import ScreeningPage from './components/ScreeningPage';
import LoginPage from './components/LoginPage';
import AdminView from './components/admin/AdminView';
import StaffView from './components/staff/StaffView';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatBot, AmplifyTheme } from 'aws-amplify-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App({ isAuthenticated }) {
	/**
	 * Only grant access to these pages if user is logged in as administrator or staff
	 * Otherwise, redirect to login.
	 */
	const PrivateRoute = ({ children, ...rest }) => {
		return (
			<Route
				{...rest}
				render={({ location }) =>
					isAuthenticated ? (
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
					<LoginPage />
				</Route>
				<Route path='/screening'>
					<ScreeningPage />
				</Route>
				<PrivateRoute path='/administrator'>
					<AdminView />
				</PrivateRoute>
				<PrivateRoute path='/staff'>
					<StaffView />
				</PrivateRoute>
			</Switch>
		</Router>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, null)(App);
