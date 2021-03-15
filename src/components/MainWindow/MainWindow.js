import './MainWindow.css';
import ChatBox from '../ChatBox/ChatBox';
import UserPanel from '../UserPanel/UserPanel';
import React from 'react';


function MainWindow(props) {
  return (
    <div className="main_window">
      <ChatBox username={props.username}/>
      {/* <UserPanel username={props.username}/> */}
    </div>
  );
}

export default MainWindow;
