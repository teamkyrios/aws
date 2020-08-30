import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

const ModalDetails = ({
	name,
	floorNumber,
	wardNumber,
	bedNumber,
	closeModal,
	currVisitors,
	scanVisitorIn,
}) => {
	const [nric, setNric] = useState('');

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h2>{name}</h2>
			<FontAwesomeIcon
				icon={faTimes}
				onClick={closeModal}
				style={{ position: 'relative', left: '90%', top: '10%' }}
			/>
			<p>Floor number: {floorNumber}</p>
			<p>Ward number: {wardNumber}</p>
			<p>Bed number: {bedNumber}</p>
			<p>Current number of visitors: {currVisitors}</p>

			<h3>Scan visitor</h3>
			<form>
				<input
					type='text'
					placeholder='NRIC'
					value={nric}
					onChange={(e) => setNric(e.target.value)}
				/>
				<button
					onClick={(e) => {
						scanVisitorIn(floorNumber, wardNumber, bedNumber, nric, e);
						closeModal();
					}}
				>
					Done
				</button>
			</form>
		</div>
	);
};

/**
 * Modal component for detailed view of the individual patient from the visitor management table.
 */
const IndividualWards = ({
	floorNumber,
	wardNumber,
	bedNumber,
	patientName,
	currVisitors,
	scanVisitorIn,
}) => {
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
					name={patientName}
					floorNumber={floorNumber}
					wardNumber={wardNumber}
					bedNumber={bedNumber}
					currVisitors={currVisitors}
					closeModal={closeModal}
					scanVisitorIn={scanVisitorIn}
				/>
			</Modal>
			<button onClick={() => setIsOpen(true)}>See more</button>
		</div>
	);
};

export default IndividualWards;
