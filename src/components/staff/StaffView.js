import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import WardViewTable from './WardViewTable';

/**
 * Alert banner which will show when there are visitors who want to visit, banner can be closed by staff.
 * @param {*} props
 */
const TopBanner = (props) => {
	if (!props.isShowing) return null;

	return (
		<Alert severity='info' onClose={props.closeBanner}>
			<AlertTitle>
				<strong>Pending Visitors </strong>
			</AlertTitle>
			<p>There are visitors awaiting entry for wards 3, 5 and 16 !</p>
			There are {props.liveVisitorNo} visitors currently
		</Alert>
	);
};

Modal.setAppElement('#root');

/**
 * Staff views the visitor management system
 */
const StaffView = () => {
	useEffect(() => {
		getUpdatedVisitorCount();
		getAllVisitors();
	}, []);

	const [liveVisitorNo, setLiveVisitorNo] = useState(115);
	const [isBannerShowing, setIsBannerShowing] = useState(true);
	const [allWards, setAllWards] = useState([
		createData('Hans', 4, 1, 12, 4),
		createData('Rui Feng', 4, 2, 12, 1),
		createData('Max', 4, 3, 12, 2),
		createData('Jun Xue', 4, 4, 12, 3),
		createData('Bayes', 1, 1, 10, 2),
		createData('Xuan Yi', 2, 2, 10, 3),
		createData('Tomas', 3, 3, 11, 1),
		createData('Toppiex', 5, 2, 13, 5),
	]);

	// Get all visitors currently
	const getAllVisitors = () => {
		console.log('Getting visitors');
		fetch(
			'http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/getAllVisitorsCheckedIn',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.log('Error getting all visitors count :', err));
	};

	const getAllPatients = () => {
		// fetch('http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/login', {
		// method: 'POST',
		// headers: {
		// 'Content-Type': 'application/json',
		// },
		// body: JSON.stringify({
		// email: formParameters.staffID,
		// password: formParameters.password,
		// }),
		// })
		// .then((res) => res.json())
		// .then((res) => {
		// if (res.code == 200) {
		// if (ACCESS == 'Administrator') {
		// authenticateUser(true, 'ADMINISTRATOR');
		// history.replace('/administrator'); // Replace the web page view
		// } else {
		// // Staff
		// authenticateUser(true, 'STAFF');
		// history.replace('/staff'); // Replace the web page view
		// }
		// } else {
		// alert('Failed to login');
		// }
		// })
		// .catch((err) => console.log('Error validating user'));
	};

	// Subscribe to DB changes
	const getUpdatedVisitorCount = () => {};

	// Scan's visitor in, and updates visitor count for that bed.
	const scanVisitorIn = (floorNumber, wardNumber, bedNumber, visitorNric, event) => {
		event.preventDefault();
		var newState = [...allWards];
		var isVisitorAllowed = false;
		newState.forEach((patient) => {
			if (
				patient.wardNumber == wardNumber &&
				patient.bedNumber == bedNumber &&
				patient.floorNumber == floorNumber
			) {
				if (patient.currVisitors < 5) {
					patient.currVisitors += 1;
					isVisitorAllowed = true;
				}
			}
		});
		setAllWards(newState);
		isVisitorAllowed
			? alert('Visitor is successfully admitted to the ward')
			: alert('Patient room is full, more visitors are not allowed');
	};

	/**
	 * Format data into an object
	 */
	function createData(name, wardNumber, bedNumber, floorNumber, currVisitors) {
		return { name, wardNumber, bedNumber, floorNumber, currVisitors };
	}

	return (
		<div>
			<TopBanner
				isShowing={isBannerShowing}
				closeBanner={() => setIsBannerShowing(false)}
				liveVisitorNo={liveVisitorNo}
			/>
			<WardViewTable rows={allWards} scanVisitorIn={scanVisitorIn} />
		</div>
	);
};

export default StaffView;
