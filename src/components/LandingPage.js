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
      <h2 style={{ marginLeft: 450 }}>Visitor Registration</h2>
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
            style={styles.input}
            type="text"
            name="nric"
            id="exampleNric"
            placeholder="S1234567Z"
          />
        </FormGroup>
        <FormGroup>
          <Label style={styles.label} for="exampleContact">
            Contact Number
          </Label>
          <Input
            style={styles.input}
            type="text"
            name="contact"
            id="exampleContact"
            placeholder="91234567"
          />
        </FormGroup>
        <FormGroup>
          <Label style={styles.label} for="examplePatient">
            Patient Name
          </Label>
          <Input
            style={styles.input}
            type="text"
            name="patientName"
            id="examplePatient"
            placeholder="Mary Jane"
          />
        </FormGroup>
        <FormGroup>
          <Label style={styles.label} for="examplePatientNric">
            Patient NRIC/Passport Number
          </Label>
          <Input
            style={styles.input}
            type="text"
            name="nric"
            id="examplePatientNric"
            placeholder="S1234567Z"
          />
        </FormGroup>
        <Button style={{ marginLeft: 720 }}>Submit</Button>
      </Form>
    </div>
  );
};

let styles = {
  input: {
    width: 400,
    marginLeft: 400,
  },
  label: {
    marginLeft: 400,
  },
};
export default LandingPage;
