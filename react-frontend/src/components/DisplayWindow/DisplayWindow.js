import { useState } from "react";
import React from "react";
import "../../assets/css/paper-dashboard.css";

function DisplayWindow(props) {
  return (
    <div className="display-window" style={{ whiteSpace: "pre-line" }}>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  );
  //}
}

export default DisplayWindow;
