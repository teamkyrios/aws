import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TopNavbar from './components/TopNavbar';
import AnnouncementPage from './components/AnnouncementPage';
import LoginPage from './components/LoginPage';
import AdminView from './components/admin/AdminView';
<<<<<<< HEAD
import connection from './Database';
=======
import StaffView from './components/staff/StaffView';
>>>>>>> a8e27c8ae3b76ec71abda0ad398ae2ecb134d543

function App({ isAuthenticated }) {
	connection.query('SELECT 1', function (error, results, fields) {
		if (error) throw error;
		alert('connected'); // connected!
	});

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
				<PrivateRoute path='/staff'>
					<StaffView/>
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