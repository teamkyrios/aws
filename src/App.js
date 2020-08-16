import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TopNavbar from './components/TopNavbar';
import AnnouncementPage from './components/AnnouncementPage';
import LoginPage from './components/LoginPage';
import AdminView from './components/admin/AdminView';

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

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, null)(App);
