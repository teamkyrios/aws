import React, { Component } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

// UI for modal component, including form to toggle visitors allowed status
const ModalDetails = ({ name, nric, visitorsAllowedStatus, closeModal }) => {
	// const CheckStatus = () => {
	// 	if (
	// 		String({ visitorsAllowedStatus }).includes(
	// 			"does not allow visitors"
	// 		)
	// 	) {
	// 		return "Allow visitors for this patient";
	// 	} else {
	// 		return "Don't allow visitors for this patient";
	// 	}
	// };

	const ChangeStatus = () => {
		// toggle visitor
		fetch(
			"http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/toggleVisitor",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					patientName: name,
					patientNric: nric,
				}),
			}
		)
			.then((res) => res.json())
			.then((res) => alert(res.message))
			.catch((err) => console.log(err));
		closeModal();
	};

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<FontAwesomeIcon
				icon={faTimes}
				onClick={closeModal}
				style={{ position: "relative", left: "90%", top: "10%" }}
			/>
			<p>Patient's name: {name}</p>
			<p>Patient's NRIC: {nric}</p>
			<p>
				<strong>{visitorsAllowedStatus}.</strong>
			</p>

			<form
				onSubmit={(event) => {
					ChangeStatus();
					event.preventDefault();
				}}
			>
				<button
					style={{
						borderRadius: "10px",
					}}
					type="submit"
				>
					Allow/block visitors for this patient
				</button>
			</form>
		</div>
	);
};

/**
 * Modal component for allowing/barring visitors from a specific patient, searched via admin form.
 */
class ToggleVisitors extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Modal
					isOpen={this.props.modalOpen}
					onRequestClose={this.props.closeModal}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<ModalDetails
						name={this.props.patientName}
						nric={this.props.patientNric}
						visitorsAllowedStatus={this.props.visitorsAllowedStatus}
						closeModal={this.props.closeModal}
					/>
				</Modal>
			</div>
		);
	}
}

export default ToggleVisitors;
