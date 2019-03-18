import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";

// Initialize Firebase

var config = {
  apiKey: "AIzaSyDMskdSmsckL2wcJ4CGv-UevnnhFFXU-cY",
  authDomain: "bloc-chat-react-b05c0.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-b05c0.firebaseio.com",
  projectId: "bloc-chat-react-b05c0",
  storageBucket: "bloc-chat-react-b05c0.appspot.com",
  messagingSenderId: "486581644145"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: { key: 0, name: "" },
      user: {}
    };
  }
  render() {
    return (
      <div className="App">
        <div className="room-container">
          <p>Bloc Chat</p>
          <RoomList
            firebase={firebase}
            setActiveRoom={function(newActiveRoom) {
              this.setState({ activeRoom: newActiveRoom });
            }.bind(this)}
          />
        </div>
        <div className="message-container">
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            username={this.state.user ? this.state.user.displayName : "Guest"}
          />
        </div>

        <div className="user-container">
          <User
            firebase={firebase}
            user={this.state.user}
            setUser={function(user) {
              this.setState({ user: user });
            }.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
