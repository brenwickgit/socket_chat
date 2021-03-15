import './ChatMessage.css';
import React from 'react';

// A simple function that converts a Date object into an hourly AM/PM string
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function ChatMessage(props) {
  return (
      <div className="chat_message" style={{ alignSelf: props.position, background: props.gradient}}>
          <div className="chat_info">
            <div className="chat_avatar">{props.user.charAt(0)}</div>
            <p className="chat_user">{props.user}:</p>
          </div>
            <p className="chat_text">{props.text}</p>
            <p className="chat_timestamp">{formatAMPM(new Date())}</p>
        </div>
  );
}

export default ChatMessage;
