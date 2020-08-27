import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import WardViewTable from './WardViewTable';

const AnnoucementPage = () => {
	return (
		<div>
			<h1>Junxue was here</h1>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, null)(AnnoucementPage);
