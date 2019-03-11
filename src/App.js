import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

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
      activeRoom: { key: 0, name: "" }
    };
  }
  render() {
    return (
      <div className="App">
        <RoomList
          firebase={firebase}
          setActiveRoom={function(newActiveRoom) {
            //setState;
          }}
        />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
