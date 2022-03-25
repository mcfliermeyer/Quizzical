import React from "react";
import "../App.css";
//import "../index.css"

function QAContainer({ question, answers, userAnswers, selectedAnswer }) {
  return (
    <div className="qa-container">
      <h3 className="question">{question}</h3>
      <div className="qa-container__answer-container">
        <div className="qa-container__answer-container__grid-div">
          <button
            className="qa-container__answer-btn"
            onClick={() => selectedAnswer(question, answers[0].answers)}
          >
            {answers[0].answers}
          </button>
          <button
            className="qa-container__answer-btn"
            onClick={() => selectedAnswer(question, answers[1].answers)}
          >
            {answers[1].answers}
          </button>
        </div>
        <div className="qa-container__answer-container__grid-div">
          <button
            className="qa-container__answer-btn"
            onClick={() => selectedAnswer(question, answers[2].answers)}
          >
            {answers[2].answers}
          </button>
          <button
            className="qa-container__answer-btn"
            onClick={() => selectedAnswer(question, answers[3].answers)}
          >
            {answers[3].answers}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QAContainer;
