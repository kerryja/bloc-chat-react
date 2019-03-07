import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref("messages");

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  createMessage() {
    this.messagesRef.push({
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
  }

  render() {
    return (
      <div>
        <section className="messages">
          <ul>
            {this.state.messages.map((message, index) => {
              return <li key={index}>{message.content}</li>;
            })}
          </ul>
        </section>
      </div>
    );
  }
}

export default MessageList;
