import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  signInWithPopUp() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div className="buttons">
        <button onClick={() => this.signInWithPopUp()}>Sign In</button>
        <button onClick={() => this.signOut()}>Sign Out</button>
        <div>
          <p className="greeting">
            Hello, {this.props.user ? this.props.user.displayName : "Guest"}!
          </p>
        </div>
      </div>
    );
  }
}

export default User;
