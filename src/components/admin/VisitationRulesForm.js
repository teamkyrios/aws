import React, { Component } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Collapsible from "../CollapsiblePanel";
import ToggleVisitors from "./ToggleVisitors";

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

// find patient by name and id to toggle visitation rule, ie. allow/ don't allow visitors for the specific patient.
const FindPatientbyId = ({ getVisitorsAllowedStatus }) => {
  return (
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
        getVisitorsAllowedStatus(values["patientName"], values["patientNric"]);
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
        <button style={{ marginBottom: 20, borderRadius: 10 }} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
};

// set maximum allowable visitors in all the wards and ICUs.
const SetMaxCount = () => {
  return (
    <Formik
      initialValues={{
        ward: "",
        icu: "",
      }}
      validationSchema={Yup.object({
        ward: Yup.number()
          .min(0, "Must be at least 0")
          .integer("Invalid type")
          .required("Required"),
        icu: Yup.number()
          .min(0, "Must be at least 0")
          .integer("Invalid type")
          .required("Required"),
      })}
      onSubmit={(values) => {
        console.log(values["ward"]);
        console.log(values["icu"]);
        fetch(
          "http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/setMaxCount",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ward: values["ward"],
              icu: values["icu"],
            }),
          }
        )
          .then((res) => res.text())
          .then((res) => {
            console.log("why");
            alert(res);
          })
          .catch((err) => console.log(err));
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
          label="Enter the maximum number of visitors allowed in wards"
          name="ward"
          type="number"
          placeholder="Number of visitors"
        />
        <MyNumberInput
          label="Enter the maximum number of visitors allowed in ICU"
          name="icu"
          type="number"
          placeholder="Number of visitors"
        />
        <button style={{ marginBottom: 20, borderRadius: 10 }} type="submit">
          Enter
        </button>
      </Form>
    </Formik>
  );
};

// Forms under the 'Chane visitation rules' tab in the admin page.
class VisitationRulesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      patientName: "",
      patientNric: "",
      visitorsAllowedStatus: "",
    };

    this.getVisitorsAllowedStatus = this.getVisitorsAllowedStatus.bind(this);

    this.closeModal = this.closeModal.bind(this);
  }

  getVisitorsAllowedStatus(patientName, patientNric) {
    fetch(
      "http://kyrios-env.eba-kvpkgwmc.us-east-1.elasticbeanstalk.com/getPatientVisitorAllowed",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName: patientName,
          patientNric: patientNric,
        }),
      }
    )
      .then((res) => res.text())
      .then((res) => {
        if (String(res).includes("enter the correct patient")) {
          alert(res);
        } else {
          this.setState({
            modalOpen: true,
            patientName: patientName,
            patientNric: patientNric,
            visitorsAllowedStatus: res,
          });
        }
      })
      .catch((err) => console.log("Error finding patient's visitation rules."));
  }

  closeModal() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    return (
      <>
        <ToggleVisitors
          patientName={this.state.patientName}
          patientNric={this.state.patientNric}
          visitorsAllowedStatus={this.state.visitorsAllowedStatus}
          modalOpen={this.state.modalOpen}
          closeModal={this.closeModal}
        />
        <Collapsible
          title="Allow/block visitors for a specific patient   "
          children={
            <FindPatientbyId
              getVisitorsAllowedStatus={this.getVisitorsAllowedStatus}
            />
          }
        />
        <Collapsible
          title="Change visitation limits for wards/ICUs   "
          children={SetMaxCount()}
        />
      </>
    );
  }
}

export default VisitationRulesForm;
