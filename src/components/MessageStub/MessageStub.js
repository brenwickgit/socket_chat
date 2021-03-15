import './MessageStub.css';
import React from 'react';

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

function MessageStub(props) {
  return (
      <div className="stub_message" style={{ alignSelf: props.position, background: props.gradient }}>
            <p className="stub_text">{props.text}</p>
            <p className="stub_timestamp">{formatAMPM(new Date())}</p>
        </div>
  );
}

export default MessageStub;
