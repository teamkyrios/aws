import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, useField } from "formik";
import CreateAnnouncement from "./admin/AnnouncementComponent";

const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	);
};

class AnnoucementPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayedAnnouncements: [],
			setkey: 0,
		};

		this.closeAnnouncement = this.closeAnnouncement.bind(this);
	}

	loadAnnouncement(formParameters) {
		// Make announcement??
		this.state.displayedAnnouncements.unshift(
			<CreateAnnouncement
				announcementText={formParameters}
				key={this.state.setkey}
				id={this.state.setkey}
				closeAnnouncement={this.closeAnnouncement}
			/>
		);
		this.setState({ setkey: this.state.setkey + 1 });
	}

	closeAnnouncement(id) {
		this.state.displayedAnnouncements.splice(
			this.state.displayedAnnouncements.findIndex(
				(x) => x.props.id === id
			),
			1
		);
		this.setState({
			displayedAnnouncements: this.state.displayedAnnouncements,
		});
	}

	fetchPatient(id) {
		// Call backend
		// Display patient name, id, visitors allowed
		// edit visitors allowed and send info back
	}

	render() {
		return (
			<div>
				<div>{this.state.displayedAnnouncements}</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div>
						<h2>Admin</h2>
						<>
							<Formik
								initialValues={{
									announcement: "",
								}}
								onSubmit={(values, { resetForm }) => {
									this.loadAnnouncement(
										values["announcement"]
									);
									resetForm({ values: "" });
								}}
							>
								<Form
									style={{
										alignItems: "flex-start",
										flexDirection: "column",
										display: "flex",
									}}
								>
									<TextInput
										label="Make an announcement"
										name="announcement"
										type="text"
										placeholder="Type announcement here"
									/>
									<button type="submit">Announce</button>
								</Form>
							</Formik>
						</>
						<>
							<Formik
								initialValues={{
									patient: "",
								}}
								onSubmit={(values) => {
									this.fetchPatient(values["patient"]);
								}}
							>
								<Form
									style={{
										alignItems: "flex-start",
										flexDirection: "column",
										display: "flex",
									}}
								>
									<TextInput
										label="Find patient"
										name="patient"
										type="text"
										placeholder="NRIC/ID#"
									/>
									<button type="submit">Search</button>
								</Form>
							</Formik>
						</>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps, null)(AnnoucementPage);
