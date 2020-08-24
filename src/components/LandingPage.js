import React from "react";
import { Formik, Form, useField } from "formik";
import styled from "@emotion/styled";
import "./FormStyles.css";
import * as Yup from "yup";
import { ChatBot, AmplifyTheme } from "aws-amplify-react";

const myTheme = {
    ...AmplifyTheme,
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        backgroundColor: "#ff6600",
    },
};

const LandingPage = () => {
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
        console.log("submitting");
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <header className="App-header">
                <h1 className="App-title">Welcome to ReactBot</h1>
            </header>
            <p className="App-intro">
                <ChatBot
                    title="My React Bot"
                    theme={myTheme}
                    botName="ScheduleAppointment_dev"
                    welcomeMessage="Welcome, how can I help you today?"
                    onComplete={handleComplete}
                    clearOnComplete={true}
                />
            </p>
            <div>
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
                                onSubmit(JSON.stringify(values, null, 2));
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

                            <button style={{ marginBottom: 20 }} type="submit">
                                Submit
                            </button>
                        </Form>
                    </Formik>
                </>
            </div>
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
