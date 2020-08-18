// import React from "react";
// import { connect } from "react-redux";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Redirect,
//     Link,
// } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
// import TopNavbar from "./components/TopNavbar";
// import AnnouncementPage from "./components/AnnouncementPage";
// import LoginPage from "./components/LoginPage";
// import AdminView from "./components/admin/AdminView";
// import Amplify, { Interactions } from "aws-amplify";
// import { ChatBot, AmplifyTheme } from "aws-amplify-react";
// import awsconfig from "./aws-exports";

// // Amplify.configure(awsconfig);
// // const myTheme = {
// //     ...AmplifyTheme,
// //     sectionHeader: {
// //         ...AmplifyTheme.sectionHeader,
// //         backgroundColor: "#ff6600",
// //     },
// // };

// function App({ isAuthenticated }) {
//     /**
//      * Only grant access to these pages if user is logged in as administrator or staff
//      * Otherwise, redirect to login.
//      */
//     const PrivateRoute = ({ children, ...rest }) => {
//         return (
//             <Route
//                 {...rest}
//                 render={({ location }) =>
//                     isAuthenticated ? (
//                         children
//                     ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/login",
//                                 state: { from: location },
//                             }}
//                         />
//                     )
//                 }
//             />
//         );
//     };

//     return (
//         <Router>
//             <TopNavbar />

//             <Switch>
//                 <Route exact path="/">
//                     <LandingPage />
//                 </Route>
//                 <Route path="/login">
//                     <LoginPage />
//                 </Route>
//                 <Route path="/announcements">
//                     <AnnouncementPage />
//                 </Route>
//                 <PrivateRoute path="/administrator">
//                     <AdminView />
//                 </PrivateRoute>
//             </Switch>
//         </Router>
//     );
// }

// const mapStateToProps = (state) => {
//     return {
//         isAuthenticated: state.auth.isAuthenticated,
//     };
// };

// export default connect(mapStateToProps, null)(App);

import React, { Component } from "react";
import "./App.css";
import Amplify, { Auth, Interactions } from "aws-amplify";
import { withAuthenticator, ChatBot, AmplifyTheme } from "aws-amplify-react";
import aws_exports from "./aws-exports"; // specify the location of aws-exports.js file on your project
Amplify.configure(aws_exports);
const myTheme = {
    ...AmplifyTheme,
    sectionHeader: {
        ...AmplifyTheme.sectionHeader,
        backgroundColor: "#222",
    },
};
class App extends Component {
    handleComplete(err, confirmation) {
        if (err) {
            alert("Bot conversation failed");
            return;
        }
        alert("Success: " + JSON.stringify(confirmation, null, 2));
        return "Appointment booked. Thank you! What would you like to do next?";
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to ReactBot</h1>
                </header>
                <p className="App-intro">
                    <ChatBot
                        title="My React Bot"
                        theme={myTheme}
                        botName="ScheduleAppointment_dev"
                        welcomeMessage="Welcome, how can I help you today?"
                        onComplete={this.handleComplete.bind(this)}
                        clearOnComplete={true}
                    />
                </p>
            </div>
        );
    }
}

export default App;
