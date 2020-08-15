import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TopNavbar from './components/TopNavbar';
import AnnouncementPage from './components/AnnouncementPage';

export default function App() {
	return (
		<Router>
			<TopNavbar />
			<Switch>
				<Route path='/announcements/'>
					<AnnouncementPage />
				</Route>
				<Route path='/'>
					<LandingPage />
				</Route>
			</Switch>
		</Router>
	);
}

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}
