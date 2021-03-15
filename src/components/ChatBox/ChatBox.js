import './ChatBox.css';
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import InfiniteScroll from 'react-infinite-scroller';
import ChatMessage from '../ChatMessage/ChatMessage';
import MessageStub from '../MessageStub/MessageStub';

const client = new W3CWebSocket('wss://brenwick-websocket-server.herokuapp.com/')

export default class ChatBox extends Component {

  messagesEndRef = React.createRef();

  state = {
    userName: this.props.username,
    isLoggedIn: false,
    messages: [],
    chat: '',
    hasMore: true
  }

  componentDidMount() {
    client.onopen = () => {
      console.log(`connected to websocket on: ${client.url}`);
    };

    // When the user gets a message from the websocket, adds it to a stateful array and updates UI
    client.onmessage =  (message) => {
      const data = JSON.parse(message.data)
      console.log(`message from server: ${data}`);
      if(data.type ===  'message'){
        this.setState((state) => ({
          messages: [...state.messages, 
          {
            msg: data.msg,
            user: data.user
          }]
        }),
        this.setState({ hasMore: false })
        );
      }
    }
  }

  // Scrolls to the bottom of the chat window, every time a new chat message occurs
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }


  // Sends the user's message to the websocket backend and clears the input chat
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('DEBUG - Websocket Readystate: ', client.readyState);
    // Checks if both the websocket is connected AND if there is actual content in the message before sending
    if(client.readyState === 1 && this.state.chat !== ''){
        client.send(JSON.stringify({
          type: "message",
          msg: this.state.chat,
          user: this.props.username
      }));
      this.setState({ chat: '' })
    }
  }

  // If the user has sent multiple consecutive messages, only lists the username and avatar on the FIRST message to save chatroom space
  checkMessage(index, message) {
    if(index !== 0 && this.state.messages[index - 1].user === message.user) {
      return <MessageStub 
                position={this.state.userName === message.user ? 'flex-end' : 'flex-start'}
                gradient={this.state.userName === message.user ? 'linear-gradient(to right bottom, #7869e9, #6c63ff)' : 'linear-gradient(to right bottom, #c7578c, #C22B8F)'} 
                key={message.msg} 
                text={message.msg} 
                user={message.user}
              />
    }
    else {
      return <ChatMessage 
                position={this.state.userName === message.user ? 'flex-end' : 'flex-start'}
                gradient={this.state.userName === message.user ? 'linear-gradient(to right bottom, #7869e9, #6c63ff)' : 'linear-gradient(to right bottom, #c7578c, #C22B8F)'}  
                key={message.msg} 
                text={message.msg} 
                user={message.user}
              />
    }
  }

  render() {
    return (
      <div className="chat_box">
        <div className="message_box">
          <InfiniteScroll
            className="infinite_scroll"
            pageStart={0}
            hasMore={this.state.hasMore}
          >
            {this.state.messages.map((message, index) => this.checkMessage(index, message))}
            <div ref={this.messagesEndRef}></div>
          </InfiniteScroll>
        </div>
        <form className="text_input" onSubmit={this.handleSubmit}>
          <input className="input_bar" placeholder="Enter a Message..." type="text" value={this.state.chat} onChange={(e) => this.setState({ chat: e.target.value })}></input>
          <button className="input_button" type="submit" onClick={this.handleSubmit}>&#x23CE;</button>
        </form>
      </div>
    )
  }
}


