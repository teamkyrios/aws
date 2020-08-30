import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, useField } from "formik";
import AnnouncementsGroup from "./admin/AnnouncementsGroup";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
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

const MyNumberInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="number-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	);
};

const AnnouncementForm = ({ loadAnnouncement }) => {
	return (
		<Formik
			initialValues={{
				announcement: "",
			}}
			validationSchema={Yup.object({
				announcement: Yup.string()
					.min(1, "Must be at least 1 character long")
					.required("Required"),
			})}
			onSubmit={(values, { resetForm }) => {
				loadAnnouncement(values["announcement"]);
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
				<MyTextInput
					label="Make an announcement"
					name="announcement"
					type="text"
					placeholder="Type announcement here"
				/>
				<button type="submit">Announce</button>
			</Form>
		</Formik>
	);
};

const PatientForm = ({ fetchPatient }) => {
	return (
		<Formik
			initialValues={{
				patient: "",
			}}
			validationSchema={Yup.object({
				patient: Yup.string()
					.min(1, "Must be at least 1 character long")
					.required("Required"),
			})}
			onSubmit={(values) => {
				fetchPatient(values["patient"]);
			}}
		>
			<Form
				style={{
					alignItems: "flex-start",
					flexDirection: "column",
					display: "flex",
				}}
			>
				<MyTextInput
					label="Find patient"
					name="patient"
					type="text"
					placeholder="NRIC/ID#"
				/>
				<button type="submit">Search</button>
			</Form>
		</Formik>
	);
};

const PatientComponent = ({
	editingPatient,
	name,
	ID,
	maxVisitorNum,
	change,
}) => {
	if (editingPatient === false) {
		return <div></div>;
	} else {
		return (
			<>
				<hr style={{ margin: "5vh 0vh" }} />
				<p>Patient's name: {name}</p>
				<p>Patient's ID: {ID}</p>
				<p>Current maximum number of visitors: {maxVisitorNum}</p>
				<Formik
					initialValues={{
						visitors: 5,
					}}
					validationSchema={Yup.object({
						visitors: Yup.number()
							.min(0, "Must be at least 0")
							.max(
								5,
								"Must be at most 5 due to current restrictions"
							)
							.required("Required"),
					})}
					onSubmit={(values) => {
						change(values["visitors"]);
						console.log(values);
					}}
				>
					<Form
						style={{
							alignItems: "flex-start",
							flexDirection: "column",
							display: "flex",
						}}
					>
						<MyNumberInput
							label="Change maximum number of visitors"
							name="visitors"
							type="number"
							placeholder="Enter a number from 0 to 5"
						/>
						<button type="submit">Confirm change</button>
					</Form>
				</Formik>
			</>
		);
	}
};

class AnnoucementPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			patientName: null,
			patientId: null,
			maxVisitorNum: null,
			editingPatient: false,
		};

		this.changeVisitorNumber = this.changeVisitorNumber.bind(this);
		this.fetchPatient = this.fetchPatient.bind(this);
		this.loadAnnouncement = this.loadAnnouncement.bind(this);
	}

	fetchPatient(id) {
		console.log("fetching patient");
		// Call backend
		// Display patient name, id, visitors allowed
		// edit visitors allowed and send info back
		this.setState({
			patientName: null,
			patientId: null,
			maxVisitorNum: null,
			editingPatient: true,
		});
	}

	loadAnnouncement(newText) {
		console.log("loading announcement");
		// put in backend
		fetch(
			"http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/updateAnnouncement",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					announcement: newText,
				}),
			}
		)
			.then((res) => res.json)
			.then((res) => console.log(res));
	}

	changeVisitorNumber(number) {
		this.setState({
			maxVisitorNum: number,
		});
		console.log(this.state.maxVisitorNum);
	}

	render() {
		return (
			<div>
				<AnnouncementsGroup />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<div>
						<h2>Admin</h2>
						<AnnouncementForm
							loadAnnouncement={this.loadAnnouncement}
						/>
						<p style={{ margin: "5vh" }}></p>
						<PatientForm fetchPatient={this.fetchPatient} />
						<PatientComponent
							editingPatient={this.state.editingPatient}
							name={this.state.patientName}
							ID={this.state.patientId}
							maxVisitorNum={this.maxVisitorNum}
							change={this.changeVisitorNumber}
						/>
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
