// import React from "react";
// import { connect } from "react-redux";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
//   Link,
// } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
// import TopNavbar from "./components/TopNavbar";
// import AnnouncementPage from "./components/AnnouncementPage";
// import LoginPage from "./components/LoginPage";
// import AdminView from "./components/admin/AdminView";
// import Amplify, { Interactions } from "aws-amplify";
// import { ChatBot, AmplifyTheme } from "aws-amplify-react";
// import awsconfig from "./aws-exports";

// Amplify.configure(awsconfig);
// const myTheme = {
//   ...AmplifyTheme,
//   sectionHeader: {
//     ...AmplifyTheme.sectionHeader,
//     backgroundColor: "#ff6600",
//   },
// };

// function App({ isAuthenticated }) {
//   /**
//    * Only grant access to these pages if user is logged in as administrator or staff
//    * Otherwise, redirect to login.
//    */
//   const PrivateRoute = ({ children, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         render={({ location }) =>
//           isAuthenticated ? (
//             children
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/login",
//                 state: { from: location },
//               }}
//             />
//           )
//         }
//       />
//     );
//   };

//   return (
//     <Router>
//       <TopNavbar />
//       <ChatBot
//         title="My Bot"
//         theme={myTheme}
//         botName="BookTrip"
//         welcomeMessage="Welcome, how can I help you today?"
//         onComplete={this.handleComplete.bind(this)}
//         clearOnComplete={true}
//         conversationModeOn={false}
//       />
//       <Switch>
//         <Route exact path="/">
//           <LandingPage />
//         </Route>
//         <Route path="/login">
//           <LoginPage />
//         </Route>
//         <Route path="/announcements">
//           <AnnouncementPage />
//         </Route>
//         <PrivateRoute path="/administrator">
//           <AdminView />
//         </PrivateRoute>
//       </Switch>
//     </Router>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.isAuthenticated,
//   };
// };

// export default connect(mapStateToProps, null)(App);

import React, { Component } from "react";
import Amplify, { Interactions } from "aws-amplify";
import { ChatBot, AmplifyTheme } from "aws-amplify-react";
import { ChatFeed, Message } from "react-chat-ui";
import awsconfig from "./aws-exports";

//Amplify.configure(awsconfig);

Amplify.configure({
  Auth: {
    identityPoolId: "us-east-1:4d6487cd-cd3d-4ec4-a225-0cc51ea210dd",
    region: "us-east-1",
  },
  Interactions: {
    bots: {
      BookTrip: {
        name: "ScheduleAppointment",
        alias: "ScheduleAppointment",
        region: "us-east-1",
      },
    },
  },
});

// Imported default theme can be customized by overloading attributes
const myTheme = {
  ...AmplifyTheme,
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "#ff6600",
  },
};

const handleComplete = (err, confirmation) => {
  if (err) {
    alert("Bot conversation failed :(");
  }
  alert("Success: " + JSON.stringify(confirmation, null, 2));
  return "Reservation booked. Thank you! What would you like to do next?";
};

class App extends Component {
  render() {
    this.state = {
      name: "",
      input: "",
      finalMessage: "",
      messages: [
        new Message({
          id: 1,
          message: "Book a flight or a car!",
        }),
      ],
    };

    const onChange = (e) => {
      const input = e.target.value;
      this.setState({
        input,
      });
    };

    const _handleKeyPress = (e) => {
      if (e.key === "Enter") {
        this.submitMessage();
      }
    };

    const submitMessage = async () => {
      const { input } = this.stateif(input === "");
      const message = new Message({
        id: 0,
        message: input,
      });
      let messages = [...this.state.messages, message];

      this.setState({
        messages,
        input: "",
      });

      const response = await Interactions.send("BookTripMOBILEHUB", input);
      const responseMessage = new Message({
        id: 1,
        message: response.message,
      });

      messages = [...this.state.messages, responseMessage];
      this.setState({ messages });

      if (response.dialogState === "Fulfilled") {
        if (response.intentName === "BookTripBookHotel") {
          const {
            slots: {
              BookTripCheckInDate,
              BookTripLocation,
              BookTripNights,
              BookTripRoomType,
            },
          } = response;
          const finalMessage = `Congratulations! Your trip to ${BookTripLocation}  with a ${BookTripRoomType} rooom on ${BookTripCheckInDate} for ${BookTripNights} days has been booked!!`;
          this.setState({ finalMessage });
        }
      }
    };

    const styles = {
      bubbleStyles: {
        text: {
          fontSize: 16,
        },
        chatbubble: {
          borderRadius: 30,
          padding: 10,
        },
      },
      headerTitle: {
        color: "white",
        fontSize: 22,
      },
      header: {
        backgroundColor: "rgb(0, 132, 255)",
        padding: 20,
        borderTop: "12px solid rgb(204, 204, 204)",
      },
      messagesContainer: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
        alignItems: "center",
      },
      input: {
        fontSize: 16,
        padding: 10,
        outline: "none",
        width: 350,
        border: "none",
        borderBottom: "2px solid rgb(0, 132, 255)",
      },
    };

    return (
      <div className="App">
        <header style={styles.header}>
          <p style={styles.headerTitle}>Welcome to my travel bot!</p>
        </header>
        <div style={styles.messagesContainer}>
          <h2>{this.state.finalMessage}</h2>
          <ChatFeed
            messages={this.state.messages}
            hasInputField={false}
            bubbleStyles={styles.bubbleStyles}
          />
          <input
            onKeyPress={this._handleKeyPress}
            onChange={this.onChange}
            style={styles.input}
            value={this.state.input}
          />
          <ChatBot
            title="My React Bot"
            botName="ScheduleAppointment"
            welcomeMessage="Would you like to book a car or hotel?"
            onComplete={handleComplete}
            clearOnComplete={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
// const App = () => {
//   const [name, setName] = React.useState("");
//   const handleComplete = (err, confirmation) => {
//     if (err) {
//       alert("Bot conversation failed");
//       return;
//     }

//     alert("Success: " + JSON.stringify(confirmation, null, 2));
//     setName("ScheduleAppointment");
//     return "Trip booked. Thank you! what would you like to do next?";
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1 className="App-title">Welcome to ChatBot Demo</h1>
//       </header>
//       <ChatBot
//         title="My Bot"
//         theme={myTheme}
//         botName={name}
//         welcomeMessage="Welcome, how can I help you today?"
//         onComplete={handleComplete}
//         clearOnComplete={true}
//         conversationModeOn={false}
//       />
//     </div>
//   );
// };

// export default App;
