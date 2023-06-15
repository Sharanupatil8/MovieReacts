import React from "react";

function ErrorMessage(props) {
  return (
    <div className="box">
      <p className="error">
        <span>❌</span> {props.message}
      </p>
    </div>
  );
}

export default ErrorMessage;
