import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import './App.css';
import Socket from './Socket/Socket';
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
      texts: ['Welcome...']
    };
  }

  textChangedHandler = (event) => {
    this.setState({
      channel: 'channel_1',
      curr_text: event.target.value
    });
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
                  <Socket
                    currentChannel={this.state.channel}
                    currentText={this.state.curr_text}
                    ></Socket>
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
