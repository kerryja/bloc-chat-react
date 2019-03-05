import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.createRoom = this.createRoom.bind(this);

    this.state = {
      rooms: [],
      newRoomName: ""
    };
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRoom() {
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ name: "" });
  }

  handleChange(e) {
    const newName = e.target.value;
    this.setState({ newRoomName: newName });
  }

  handleSubmit() {
    this.createRoom(this.state.newRoomName);
  }

  render() {
    return (
      <div>
        <section>
          {this.state.rooms.map(room => (
            <li>{room.name}</li>
          ))}
        </section>
        <section>
          <form id="create-room" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              value={this.state.newRoomName}
              onChange={this.handleChange.bind(this)}
              name="newRoomName"
              placeholder="Create a new room"
            />
            <input type="submit" value="+" />
          </form>
        </section>
      </div>
    );
  }
}

export default RoomList;
