import React from "react";
import "../App.css";

export default function SubmitAnswers(props) {

    return (
        <button className="submit-answers-btn" onClick={props.handleClick}>Submit Answers</button>
    )
}