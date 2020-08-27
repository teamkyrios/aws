import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import WardViewTable from './WardViewTable';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

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
			There are visitors awaiting entry for wards 3, 5 and 16 !
		</Alert>
	);
};

Modal.setAppElement('#root');

const AnnoucementPage = () => {
	useEffect(() => {
		getUpdatedVisitorCount();
	}, []);

	const [liveVisitorNo, setLiveVisitorNo] = useState(0);
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
	const [modalIsOpen, setIsOpen] = useState(false);

	// Subscribe to DB changes
	const getUpdatedVisitorCount = () => {};

	/**
	 * Format data into an object
	 */
	function createData(name, wardNumber, bedNumber, floorNumber, currVisitors) {
		return { name, wardNumber, bedNumber, floorNumber, currVisitors };
	}

	const ModalDetails = ({ name, wardNumber, bedNumber, closeModal }) => {
		return (
			<div>
				<h2>{name}</h2>
				<button onClick={closeModal}>close</button>
				<div>{wardNumber}</div>
				<form>
					<input />
					<button>{bedNumber}</button>
					<button>inside</button>
					<button>the modal</button>
				</form>
			</div>
		);
	};

	const IndividualWards = ({ wardNumber, bedNumber, visitorName }) => {
		const [isOpen, setIsOpen] = useState(false);

		const closeModal = () => setIsOpen(false);

		return (
			<div>
				<Modal
					isOpen={isOpen}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel='Example Modal'
				>
					<ModalDetails
						name={visitorName}
						wardNumber={wardNumber}
						bedNumber={bedNumber}
						closeModal={closeModal}
					/>
				</Modal>
				<h3>Ward number: {wardNumber}</h3>
				<p>Bed number: {bedNumber} </p>
				<p>Patient name: {visitorName} </p>
				<p>Current number of visitors </p>
				<button onClick={() => setIsOpen(true)}>See more</button>
			</div>
		);
	};

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
