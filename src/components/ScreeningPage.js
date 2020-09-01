import React, { useState } from 'react';
import { connect } from 'react-redux';
import AnnouncementsGroup from './admin/AnnouncementsGroup';
import { makeStyles, Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Screening from '../assets/Screening.png';
import Button from '@material-ui/core/Button';
import QRCode from '../assets/QRCode.png';

const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(70),
		height: theme.spacing(70),
	},
	small: {
		width: theme.spacing(30),
		height: theme.spacing(30),
	},
}));

const defaultProps = {
	bgcolor: 'background.paper',
	m: 1,
	border: 2,
	style: { width: '98%', height: '98%', borderRadius: 20 },
};

const ScreeningPage = () => {
	const [isPermitted, setIsPermitted] = useState(false);
	return (
		<div>
			<AnnouncementsGroup />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div>
					<h2 style={{ textAlign: 'center' }}>Welcome</h2>
					<h3>Please remember to wear a mask at all times</h3>
				</div>
				<div
					style={{
						borderRadius: 20,
						height: 900,
						width: '65%',
						backgroundColor: '#F0f0f0',
					}}
				>
					<Box
						borderColor={isPermitted ? 'primary.main' : 'error.main'}
						{...defaultProps}
						display='flex'
						justifyContent='center'
					>
						<div style={{ flexDirection: 'column', display: 'flex' }}>
							<Avatar
								src={Screening}
								className={useStyles().large}
								variant='circle'
							/>
							<div style={{ flexDirection: 'row', display: 'flex' }}>
								<div>
									<h3>{isPermitted ? '36.7 °C' : '37.6 °C'} </h3>
									<p style={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>
										{isPermitted
											? 'Entry was permitted'
											: 'Entry not permitted'}
									</p>
									<Button
										variant='contained'
										color='primary'
										onClick={() => setIsPermitted(!isPermitted)}
									>
										Next
									</Button>
								</div>
								<div style={{ marginLeft: 200 }}>
									<p style={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>
										Safe Entry Check-In
									</p>
									<Avatar
										src={QRCode}
										className={useStyles().small}
										variant='square'
									/>
								</div>
							</div>
						</div>
					</Box>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, null)(ScreeningPage);
