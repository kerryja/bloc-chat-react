import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";

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
  render() {
    return (
      <div className="App">
        <RoomList />
      </div>
    );
  }
}

export default App;
