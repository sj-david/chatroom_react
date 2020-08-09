import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import io from 'socket.io-client';

import { style } from '@material-ui/system';

class App extends Component {
  // What data structures are available for react.js..? (linked lists)...
  constructor(props) {
    super(props);
    this.state = {
      channel: 'channel_1',
      texts: ['...']
    };
  }

  // After all the elements of the page are rendered correctly, this method is called...
  componentDidMount() {
    const api_uri = 'http://127.0.0.1:4001/channel_1';
    const api_socket = io(api_uri);

    api_socket.on('connect', data => {
      console.log('connected to api_gateway...');
    });

    api_socket.on('get_new_msg', msg => {
      this.setState({
        apiSocket: this.state.apiSocket,
        channel: this.state.channel,
        currentText: this.state.currentText,
        texts: [...this.state.texts, msg]
      });
    });

    this.setState({
      channel: 'channel_1',
      apiSocket: api_socket,
      texts: ['...']
    });
  }

  textChangedHandler = (event) => {
    this.setState({
      apiSocket: this.state.apiSocket,
      channel: this.state.channel,
      currentText: event.target.value,
      texts: [...this.state.texts]
    });
  }

  enterMessageHandler = (event) => {
    this.state.apiSocket.emit('new_msg', {channel: this.state.channel, msg: this.state.currentText});
  }

  joinChannelHandler = (event) => {
    this.state.apiSocket.emit('join_channel');
  }

  render() {
    return (
      <div className="App">
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Chatroom_1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Message(s)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.texts.map((text, index) => {
                return <TableRow><TableCell>{text}</TableCell></TableRow>
              })}
              <TableRow>
                <TableCell>
                  <UserInput
                    changed={this.textChangedHandler}
                    currentText={this.state.curr_text}
                    />
                </TableCell>
                <TableCell width="10%">
                  <Button variant="contained" color="primary" onClick={this.enterMessageHandler}>Send</Button>
                </TableCell>
                <TableCell width="10%">
                  <Button variant="contained" color="primary" onClick={this.joinChannelHandler}>Join</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}


export default hot(module)(App);
