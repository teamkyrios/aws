import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const LandingPage = () => {
  return (
    <div
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Visitor Registration</h1>
      <Form>
        <FormGroup style={{}}>
          <Label style={styles.label} for="exampleName">
            Full Name
          </Label>
          <Input
            style={styles.input}
            type="text"
            name="name"
            id="exampleName"
            placeholder="John Smith"
          />
        </FormGroup>
        <FormGroup>
          <Label style={styles.label} for="exampleNric">
            Your NRIC/Passport Number
          </Label>
          <Input
            type="text"
            name="nric"
            id="exampleNric"
            placeholder="S1234567Z"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleContact">Contact Number</Label>
          <Input
            type="text"
            name="contact"
            id="exampleContact"
            placeholder="91234567"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePatient">Patient Name</Label>
          <Input
            type="text"
            name="patientName"
            id="examplePatient"
            placeholder="Mary Jane"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePatientNric">Patient NRIC/Passport Number</Label>
          <Input
            type="text"
            name="nric"
            id="examplePatientNric"
            placeholder="S1234567Z"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

let styles = {
  input: {
    width: 300,
    marginLeft: 300,
  },
  label: {
    marginLeft: 300,
  },
};
export default LandingPage;
