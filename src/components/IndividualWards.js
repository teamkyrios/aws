import React, { useState } from 'react';
import Modal from 'react-modal';

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
