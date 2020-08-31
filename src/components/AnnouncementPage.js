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

const AnnouncementForm = () => {
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
							announcement: values["announcement"],
						}),
					}
				)
					.then((res) => res.text())
					.then((res) => alert(res))
					.catch((err) => alert("Error updating announcement"));
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
				<button style={{ borderRadius: 10 }} type="submit">
					Announce
				</button>
			</Form>
		</Formik>
	);
};

const VisitationForm = () => {
	let findPatientbyId = (
		<Formik
			initialValues={{
				patientName: "",
				patientNric: "",
			}}
			validationSchema={Yup.object({
				patientName: Yup.string()
					.min(1, "Must be at least 1 character long")
					.required("Required"),
				patientNric: Yup.string()
					.min(1, "Must be at least 1 character long")
					.required("Required"),
			})}
			onSubmit={(values) => {
				fetch(
					"http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/getPatientVisitorAllowed",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							patientName: values["patientName"],
							patientNric: values["patientNric"],
						}),
					}
				)
					.then((res) => res.text())
					.then((res) => alert(res))
					.catch((err) =>
						console.log("Error finding patient's visitation rules")
					);
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
					label="Patient's name"
					name="patientName"
					type="text"
					placeholder="Jon Snow"
				/>
				<MyTextInput
					label="Patient's NRIC/ID"
					name="patientNric"
					type="text"
					placeholder="S0011223A"
				/>
				<button
					style={{ marginBottom: 20, borderRadius: 10 }}
					type="submit"
				>
					Search
				</button>
			</Form>
		</Formik>
	);
	let setMaxCount = (
		<Formik
			initialValues={{
				ward: "",
				icu: "",
				visitors: "",
			}}
			validationSchema={Yup.object({
				ward: Yup.number()
					.min(1, "Must be at least 1")
					.required("Required"),
				icu: Yup.number()
					.min(1, "Must be at least 1")
					.required("Required"),
				visitors: Yup.number()
					.min(0, "Must not be a negative number")
					.required("Required"),
			})}
			onSubmit={(values) => {
				fetch(
					"http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/setMaxCount",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							ward: values["ward"],
							icu: values["icu"],
							something: values["visitors"],
						}),
					}
				)
					.then((res) => res.text())
					.then((res) => alert(res))
					.catch((err) => alert("Error setting max count"));
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
					label="Ward number"
					name="ward"
					type="number"
					placeholder="Enter the ward number"
				/>
				<MyNumberInput
					label="ICU number"
					name="icu"
					type="number"
					placeholder="Enter the ICU number"
				/>
				<MyNumberInput
					label="Maximum number of visitors allowed"
					name="visitors"
					type="number"
					placeholder="Enter a positive number"
				/>
				<button
					style={{ marginBottom: 20, borderRadius: 10 }}
					type="submit"
				>
					Enter
				</button>
			</Form>
		</Formik>
	);
	return (
		<>
			<div>{findPatientbyId}</div>
			<div>{setMaxCount}</div>
		</>
	);
};

class AnnoucementPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adminTab: 0,
		};
	}

	changeAdminTab(index) {
		this.setState({
			adminTab: index,
		});
	}

	render() {
		let currAdminTab;
		if (this.state.adminTab === 0) {
			currAdminTab = <AnnouncementForm />;
		} else if (this.state.adminTab === 1) {
			currAdminTab = <VisitationForm />;
		}

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
					<h2>Admin</h2>
					<div
						style={{
							flexDirection: "row",
						}}
					>
						<button
							style={{
								borderRadius: 10,
							}}
							onClick={() => this.changeAdminTab(0)}
						>
							Make an announcement
						</button>
						<button
							style={{
								borderRadius: 10,
							}}
							onClick={() => this.changeAdminTab(1)}
						>
							Change visitation rules
						</button>
					</div>
					<div
						style={{
							flexDirection: "column",
						}}
					>
						<hr />
						{currAdminTab}
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
