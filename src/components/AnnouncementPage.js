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

const AnnoucementPage = () => {
	useEffect(() => {
		getUpdatedVisitorCount();
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
		createData('Toppiex', 5, 2, 13, 6),
	]);

	// Subscribe to DB changes
	const getUpdatedVisitorCount = () => {};

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
			<WardViewTable rows={allWards} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, null)(AnnoucementPage);
