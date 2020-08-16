import React from "react";
import { Formik, Form, useField } from "formik";
import styled from "@emotion/styled";
import "./FormStyles.css";
import * as Yup from "yup";

const LandingPage = () => {
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
