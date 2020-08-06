import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import Button from "@material-ui/core/Button";

const Socket = (props) => {
  const URI = 'http://127.0.0.1:4001';
  const [apiSocket, setAPISocket] = useState("");

  useEffect(() => {
    const apiSock = io(URI);
    apiSock.on('connect', data => {
      setAPISocket(apiSock);
    });
    // Need to implement cleanup here...
  }, [URI]);

  const enterMessageHandler = event => {
    apiSocket.emit('send_msg', {channel: props.currentChannel, msg: props.currentText});
  };

  const joinRoomHandler = event => {
    apiSocket.apiSock.emit('join_room', {room_name: props.room_name})
  };

  return (
    <Button variant="contained" color="primary" onClick={enterMessageHandler}>Send</Button>
  );
};

export default Socket;
