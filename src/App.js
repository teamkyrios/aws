import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TopNavbar from './components/TopNavbar';
import AnnouncementPage from './components/AnnouncementPage';
import LoginPage from './components/LoginPage';

export default function App() {
	return (
		<Router>
			<TopNavbar />
			<Switch>
				<Route path='/announcements/'>
					<AnnouncementPage />
				</Route>
				<Route path='/login/'>
					<LoginPage />
				</Route>
				<Route path='/'>
					<LandingPage />
				</Route>
			</Switch>
		</Router>
	);
}
