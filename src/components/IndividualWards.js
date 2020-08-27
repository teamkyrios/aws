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

const ModalDetails = ({ name, wardNumber, bedNumber, closeModal }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<h2>{name}</h2>
			<FontAwesomeIcon
				icon={faTimes}
				onClick={closeModal}
				style={{ position: 'relative', left: '90%', top: '10%' }}
			/>
			<p>Ward number: {wardNumber}</p>
			<p>Bed number: {bedNumber}</p>
			<h3>Scan a visitor in</h3>
			<form>
				<input />
				<button>Done</button>
			</form>
		</div>
	);
};

/**
 * Modal component for detailed view of the individual patient from the visitor management table.
 */
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
			<button onClick={() => setIsOpen(true)}>See more</button>
		</div>
	);
};

export default IndividualWards;
