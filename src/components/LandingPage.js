import React from "react";
import { Formik, Form, useField } from "formik";
import styled from "@emotion/styled";
import "./FormStyles.css";
import * as Yup from "yup";
import { ChatBot, AmplifyTheme } from "aws-amplify-react";
import ForumIcon from "@material-ui/icons/Forum";
import AnnouncementsGroup from "./admin/AnnouncementsGroup";

const myTheme = {
	...AmplifyTheme,
	sectionHeader: {
		...AmplifyTheme.sectionHeader,
		backgroundColor: "#ff6600",
	},
};

const LandingPage = () => {
	const [isChatVisible, setVisible] = React.useState(false);

	const handleComplete = (err, confirmation) => {
		if (err) {
			alert("Bot conversation failed");
			return;
		}
		alert("Success: " + JSON.stringify(confirmation, null, 2));
		return "Appointment booked. Thank you! What would you like to do next?";
	};

	const onSubmit = (formParameters) => {
		// Check form parameters and do necessary
		fetch(
			"http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/visitorRegistration",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					visitorName: formParameters.name,
					visitorNric: formParameters.nric,
					patientName: formParameters.patientName,
					patientNric: formParameters.patientNric,
				}),
			}
		)
			.then((res) => res.text())
			.then((res) => {
				console.log("Response is ", res);
				if (res.status == 200) {
					console.log(res);
					alert("Registration successful");
				} else {
					console.log(res);
					alert("Registration");
				}
			})
			.catch((err) => console.log("Error registering visitor", err));

		console.log("submitting");
	};

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
				<h2>Visitor Registration</h2>
				<>
					<Formik
						initialValues={{
							name: "",
							nric: "",
							contact: "",
							patientName: "",
							patientNric: "",
						}}
						validationSchema={Yup.object({
							name: Yup.string().required("Required"),
							nric: Yup.string().required("Required"),
							contact: Yup.string().required("Required"),
							patientName: Yup.string().required("Required"),
							patientNric: Yup.string().required("Required"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								console.log("Values are", values);
								onSubmit(values);
								setSubmitting(false);
							}, 400);
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
								label="Your Name"
								name="name"
								type="text"
								placeholder="John Smith"
							/>
							<MyTextInput
								label="Your NRIC/Passport Number"
								name="nric"
								type="text"
								placeholder="S1234567A"
							/>
							<MyTextInput
								label="Your Contact Number"
								name="contact"
								type="number"
								placeholder="91234567"
							/>
							<MyTextInput
								label="Patient Name"
								name="patientName"
								type="text"
								placeholder="Mary Jane"
							/>
							<MyTextInput
								label="Patient NRIC/Passport Number"
								name="patientNric"
								type="text"
								placeholder="S9876543Z"
							/>

							<button
								style={{ marginBottom: 20, borderRadius: 10 }}
								type="submit"
							>
								Submit
							</button>
						</Form>
					</Formik>
				</>
			</div>
			<div>
				<button
					style={{
						position: "absolute",
						right: 100,
						bottom: 50,
						borderRadius: 10,
					}}
					onClick={() => setVisible(!isChatVisible)}
				>
					<ForumIcon />
				</button>
			</div>
			{isChatVisible ? (
				<div style={{ position: "absolute", right: 100, bottom: 100 }}>
					<p className="App-intro">
						<ChatBot
							title="AWS Lex"
							theme={myTheme}
							botName="ScheduleAppointment_dev"
							welcomeMessage="Welcome, how can I help you today?"
							onComplete={handleComplete}
							clearOnComplete={true}
						/>
					</p>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

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

export default LandingPage;
