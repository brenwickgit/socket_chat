import './UserPanel.css';
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('wss://brenwick-websocket-server.herokuapp.com')

export default class UserPanel extends Component {

  state = {
    serverMessages: []
  }
 
  componentDidMount() {
    
    client.onopen = () => {
      client.send(JSON.stringify({
        type: "server",
        msg: `${this.props.username} connected to the server.`,
        user: this.props.username
    }));
      console.log('Sent Server Message');
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if(data.type === 'server'){
        this.setState((state) => ({
          serverMessages: [...state.serverMessages,
          {
            msg: data.msg,
            user: data.user
          }]
        })
      )}
    }
  }


render() {
  return (
    <div className="user_panel">
      {this.state.serverMessages.map(message => <p className="panel_text">{message.msg}</p>)}
    </div>
  );
}

}

