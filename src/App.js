import React, { Component } from 'react';
import './App.css';
import MainWindow from './components/MainWindow/MainWindow';


export default class App extends Component {

  state = {
    loggedIn: false,
    username: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.username !== ''){
      this.setState({ loggedIn: true })
    }
  }

  render(){
    return (
      <div className="main_container">
        {this.state.loggedIn
        ?
        <MainWindow username={this.state.username}/>
        :
        <div className="login_screen">
          <h1 className="login_text">Choose A Nickname</h1>
          <form className="login_form" onSubmit={this.handleSubmit}>
            <input className="login_input" onChange={(e) => this.setState({ username: e.target.value })}></input>
            <button className="login_button" type="submit">Submit</button>
          </form>
          </div>}
      </div>
    )
  }
}
