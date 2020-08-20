import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, useField } from "formik";
import CreateAnnouncement from "./AnnouncementComponent";

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

class AnnoucementPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedData: [],
      setkey: 0,
    };

    this.closeAnnouncement = this.closeAnnouncement.bind(this);
  }

  loadText(formParameters) {
    // Make announcement??
    this.state.displayedData.unshift(
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
    this.state.displayedData.splice(
      this.state.displayedData.findIndex((x) => x.props.id === id),
      1
    );
    this.setState({ displayedData: this.state.displayedData });
  }

  render() {
    return (
      <div>
        <div>{this.state.displayedData}</div>
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
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    this.loadText(values["announcement"]);
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
                    label="Announcement"
                    name="announcement"
                    type="text"
                    placeholder="Type announcement here"
                  />
                  <button type="submit">Submit</button>
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
