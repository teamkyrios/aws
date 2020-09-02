import React, { Component } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Button, ButtonGroup } from "reactstrap";
import VisitationRulesForm from "./VisitationRulesForm";

const MyTextAreaInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<textarea {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	);
};

// Takes in a string and uploads onto announcement database
const AnnouncementForm = () => {
	return (
		<>
			<hr />
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
					console.log(
						"Loading announcement: " + values["announcement"]
					);
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
						.catch((err) => alert("Error updating announcement."));
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
					<MyTextAreaInput
						label="Make an announcement"
						name="announcement"
						component="textarea"
						rows="3"
						placeholder="Type announcement here"
					/>
					<button style={{ borderRadius: 10 }} type="submit">
						Announce
					</button>
				</Form>
			</Formik>
		</>
	);
};

class AdminView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adminTab: 2,
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
			currAdminTab = <VisitationRulesForm />;
		}

		return (
			<div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						margin: "10px",
					}}
				>
					<h2>Administrator</h2>
					<div
						style={{
							flexDirection: "row",
						}}
					>
						<ButtonGroup>
							<Button
								size="lg"
								onClick={() => this.changeAdminTab(0)}
							>
								<strong>Make an announcement</strong>
							</Button>
							<Button
								size="lg"
								onClick={() => this.changeAdminTab(1)}
							>
								<strong>Change visitation rules</strong>
							</Button>
						</ButtonGroup>
					</div>
					<div
						style={{
							flexDirection: "column",
						}}
					>
						{currAdminTab}
					</div>
				</div>
			</div>
		);
	}
}

export default AdminView;
