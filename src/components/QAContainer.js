import React from "react";
import "../App.css";
//import "../index.css"

function QAContainer({ question, answers, selectedAnswer }) {
  return (
    <div className="qa-container">
      <h3 className="question">{question}</h3>
      <div className="qa-container__answer-container">
        <div className="qa-container__answer-container__grid-div">
          <button
            className="qa-container__answer-btn"
            onClick={() => selectedAnswer(question, answers[0])}
          >
            {answers[0]}
          </button>
          <button
            className="qa-container__answer-btn"
            onClick={() => selectedAnswer(question, answers[1])}
          >
            {answers[1]}
          </button>
        </div>
        <div className="qa-container__answer-container__grid-div">
          <button
            className="qa-container__answer-btn"
            onClick={() => selectedAnswer(question, answers[2])}
          >
            {answers[2]}
          </button>
          <button
            className="qa-container__answer-btn"
            onClick={() => selectedAnswer(question, answers[3])}
          >
            {answers[3]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QAContainer;
