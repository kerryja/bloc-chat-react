import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref("rooms");

    this.state = {
      rooms: []
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
    this.roomsRef.push({
      name: this.state.rooms.name
    });
  }

  render() {
    return (
      <form onSubmit={this.createRoom.bind(this)}>
        <input type="text" ref={input => (this.state.rooms.name = input)} />
        <input type="submit" />
      </form>
    );
  }
}

export default RoomList;

/*<div>
        <ul>
          {this.state.rooms.map(room => {
               (<li>{room.name}</li>);
          })}
        </ul>
      </div>
    )
        }*/
