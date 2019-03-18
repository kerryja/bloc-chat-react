import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref("messages");

    this.state = {
      messages: [],
      newMessage: ""
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
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      username: this.props.username
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newMessage) {
      return;
    }
    this.createMessage(this.state.newMessage);
    this.setState({ newMessage: "" });
  }

  handleChange(e) {
    const newName = e.target.value;
    this.setState({ newMessage: newName });
  }

  render() {
    return (
      <div>
        <section>
          <p>{this.props.activeRoom.name}</p>
          <ul className="messages">
            {this.state.messages
              .filter(message => message.roomId === this.props.activeRoom.key)
              .map((message, index) => {
                return (
                  <li key={index}>
                    {new Date(message.sentAt).toString()}
                    {message.username}
                    {message.content}
                  </li>
                );
              })}
          </ul>
          <div className="create-message">
            <form onSubmit={e => this.handleSubmit(e)}>
              <input
                type="text"
                value={this.state.newMessage}
                onChange={e => this.handleChange(e)}
                name="newMessage"
                placeholder="Write your message here"
              />
              <input type="submit" value="Send" />
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default MessageList;
