import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import WardViewTable from './WardViewTable';
import { storeVisitors } from '../../actions';

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
			<p>There are visitors awaiting entry for wards 7, 8 and 11 !</p>
			There are {props.liveVisitorNo} visitors currently
		</Alert>
	);
};

Modal.setAppElement('#root');

/**
 * Staff views the visitor management system
 */
const StaffView = ({ storeVisitors, allCheckedInVisitors }) => {
	useEffect(() => {
		getAllPatients();
		getAllVisitors();
	}, []);

	const [liveVisitorNo, setLiveVisitorNo] = useState(0);
	const [isBannerShowing, setIsBannerShowing] = useState(true);
	const [allWards, setAllWards] = useState([]);

	// Get all visitors currently checked in
	const getAllVisitors = () => {
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
				var allVisitors = {};
				res.forEach((visitor) => {
					allVisitors[visitor.visitorNric] = visitor.visitorNric;
				});
				storeVisitors(allVisitors);
				// Store live visitor count
				setLiveVisitorNo(Object.keys(allVisitors).length);
			})
			.catch((err) => console.log('Error getting all visitors count :', err));
	};

	// Get all patients and patient's details from database
	const getAllPatients = () => {
		fetch('http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/getLivePatientData', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				var allWard = [];
				res.forEach((patient) => {
					var data = createData(
						patient.patientName,
						patient.wardNumber,
						patient.bedNumber,
						patient.wardNumber,
						patient.currentNumberOfVisitors
					);
					allWard.push(data);
				});
				setAllWards(allWard);
			})
			.catch((err) => console.log('Error getting all patients: ', err));
	};

	// API call to store checked in visitor to database
	const checkVisitorIn = (floorNumber, wardNumber, bedNumber, Nric) => {
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

		if (isVisitorAllowed) {
			fetch('http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/visitorAccess', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					visitorNric: Nric,
				}),
			})
				.then((res) => res.text())
				.then((res) => {
					console.log('Successful checking in of visitor: ', res);
					if (res.includes('Visitor has been approved')) {
						var allVisitors = allCheckedInVisitors;
						allVisitors[Nric] = Nric;
						storeVisitors(allVisitors); // Update redux state
						setLiveVisitorNo(liveVisitorNo++);
						alert('Visitor is successfully admitted to the ward');
					}
				})
				.catch((err) => console.log('Error checking visitor in:', err));
		} else {
			alert('Patient room is full, no more visitors are allowed');
		}

		getAllVisitors(); // Refresh state
	};

	// Make backend call to check visitor out of database
	const checkVisitorOut = (floorNumber, wardNumber, bedNumber, Nric) => {
		// Update front end table visitor count
		var newState = [...allWards];
		newState.forEach((patient) => {
			if (
				patient.wardNumber == wardNumber &&
				patient.bedNumber == bedNumber &&
				patient.floorNumber == floorNumber
			) {
				patient.currVisitors -= 1;
			}
		});

		setAllWards(newState);
		fetch('http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/visitorCheckout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				visitorNric: Nric,
			}),
		})
			.then((res) => res.text())
			.then((res) => {
				if (res.includes('Visitor has been checked out')) {
					var allVisitors = allCheckedInVisitors;
					delete allVisitors[Nric];
					storeVisitors(allVisitors); // Update redux state
					setLiveVisitorNo(liveVisitorNo--);
					alert('Visitor is successfully checked out');
				}
			})
			.catch((err) => console.log('Error checking visitor out :', err));

		getAllVisitors(); // Refresh state
	};

	const visitorIsCheckedIn = (Nric) => {
		return Nric in allCheckedInVisitors;
	};

	const scanVisitorIn = (floorNumber, wardNumber, bedNumber, visitorNric, event) => {
		event.preventDefault();
		if (visitorIsCheckedIn(visitorNric)) {
			checkVisitorOut(floorNumber, wardNumber, bedNumber, visitorNric);
		} else {
			// Visitor not yet checked in
			checkVisitorIn(floorNumber, wardNumber, bedNumber, visitorNric);
		}
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

const mapDispatchToProps = (dispatch) => ({
	storeVisitors: (allVisitors) => dispatch(storeVisitors(allVisitors)),
});

const mapStateToProps = (state) => {
	return {
		allCheckedInVisitors: state.visitors.allVisitors, // Object
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffView);
