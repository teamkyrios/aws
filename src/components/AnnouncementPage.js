import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Button } from 'reactstrap';
import { MDBCloseIcon } from 'mdbreact';

const TopBanner = (props) => {
	if (!props.isShowing) return null;

	return (
		<div
			style={{
				display: 'flex',
				justifySelf: 'center',
				alignSelf: 'center',
				height: '80%',
				width: '80%',
				backgroundColor: 'gold',
				borderColor: 'black',
				flexDirection: 'column',
			}}
		>
			<h2>Visitor Management</h2>
			<p>An all in one system for managing visitors</p>

			<h3>Live visitor number: {props.liveVisitorNo}</h3>
			<Button color='primary' onClick={props.closeBanner}>
				Close
			</Button>
		</div>
	);
};

const AnnoucementPage = () => {
	useEffect(() => {
		getUpdatedVisitorCount();
	}, []);

	const [liveVisitorNo, setLiveVisitorNo] = useState(0);
	const [isBannerShowing, setIsBannerShowing] = useState(true);
	const [allWards, setAllWards] = useState([
		{ wardNumber: 1, visitorName: 'Hans', bedNumber: 2 },
		{ wardNumber: 1, visitorName: 'Tom', bedNumber: 3 },
		{ wardNumber: 1, visitorName: 'Jessi', bedNumber: 1 },
		{ wardNumber: 1, visitorName: 'Ray', bedNumber: 4 },
	]);

	// Subscribe to DB changes
	const getUpdatedVisitorCount = () => {};

	const renderAllWards = allWards.map((ward) => (
		<li>
			<h3>Ward number: {ward.wardNumber}</h3>
			<p>Bed number: {ward.bedNumber} </p>
			<p>Patient name: {ward.visitorName} </p>
			<p>Current number of visitors </p>
			<Button onClick={() => alert('Open modal')}>See more</Button>
		</li>
	));

	return (
		<div>
			<h1>Staff View</h1>
			<TopBanner
				isShowing={isBannerShowing}
				closeBanner={() => setIsBannerShowing(false)}
				liveVisitorNo={liveVisitorNo}
			/>

			<h3>Detailed view of visitiors:</h3>
			<ul>{renderAllWards}</ul>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, null)(AnnoucementPage);
