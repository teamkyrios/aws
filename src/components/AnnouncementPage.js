import React from 'react';
import { connect } from 'react-redux';

const AnnoucementPage = () => {
	return (
		<div>
			<h1>Announcement page</h1>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, null)(AnnoucementPage);
