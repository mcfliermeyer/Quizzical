import React from "react";
import "../App.css";
//import "../index.css"

function QAContainer({
  question,
  answers,
  index,
  handleSelectedAnswer,
  eachAnswerStyle,
}) {
  const selectedStyle = {
    backgroundColor: "#2bcabde6",
  };

  function applyStyle(answerIndex) {
    if (eachAnswerStyle.length > 0) {
      return eachAnswerStyle[answerIndex];
    }
    if (answers[answerIndex].isSelected) {
      return selectedStyle;
    }
  }
  return (
    <div className="qa-container">
      <h3 className="question">{question}</h3>
      <div className="qa-container__answer-container">
        <div className="qa-container__answer-container__grid-div">
          <button
            className="qa-container__answer-btn"
            style={applyStyle(0)}
            onClick={() =>
              handleSelectedAnswer(question, index, answers[0].answer)
            }
          >
            {answers[0].answer}
          </button>
          <button
            className="qa-container__answer-btn"
            style={applyStyle(1)}
            onClick={() =>
              handleSelectedAnswer(question, index, answers[1].answer)
            }
          >
            {answers[1].answer}
          </button>
        </div>
        <div className="qa-container__answer-container__grid-div">
          <button
            className="qa-container__answer-btn"
            style={applyStyle(2)}
            onClick={() =>
              handleSelectedAnswer(question, index, answers[2].answer)
            }
          >
            {answers[2].answer}
          </button>
          <button
            className="qa-container__answer-btn"
            style={applyStyle(3)}
            onClick={() =>
              handleSelectedAnswer(question, index, answers[3].answer)
            }
          >
            {answers[3].answer}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QAContainer;
