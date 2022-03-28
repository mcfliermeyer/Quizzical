import React from "react";
import "../App.css";

export default function SubmitAnswers(props) {
  return (
    <button
      className="submit-answers-btn"
      style={{
        boxShadow:
          "0 5px 8px rgba(0, 0, 0, 0.5), inset 0 -2px 6px 2px rgba(0, 0, 0, 0.5)",
      }}
      onClick={props.handleClick}
    >
      Submit Answers
    </button>
  );
}
