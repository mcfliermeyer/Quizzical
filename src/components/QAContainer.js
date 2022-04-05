import React from "react";
import "../App.css";

function QAContainer({
  question,
  answers,
  index,
  handleSelectedAnswer,
  eachAnswerStyle,
}) {

  const selectedStyle = {
    boxShadow: "inset 0 5px 8px 2px rgba(0, 0, 0, 0.5)",
  };
  const unSelectedStyle = {
    boxShadow: "0 5px 8px rgba(0, 0, 0, 0.5), inset 0 -2px 6px 2px rgba(0, 0, 0, 0.5)", //prettier-ignore
  };
  function applyStyle(answerIndex) {
    if (eachAnswerStyle.length > 0) {
      return eachAnswerStyle[answerIndex];
    }
    if (answers[answerIndex].isSelected) {
      return selectedStyle;
    }
    else {
      return unSelectedStyle
    }
  }
  return (
    <div className="qa-container clay-morphism-container">
      <h3 className="question">{question}</h3>
      <div className="qa-container__answer-container">
        <div className="qa-container__answer-container__grid-div">
          <button
            className="qa-container__answer-btn clay-morphism-button"
            style={applyStyle(0)}
            onClick={() =>
              handleSelectedAnswer(question, index, answers[0].answer)
            }
          >
            {answers[0].answer}
          </button>
          <button
            className="qa-container__answer-btn clay-morphism-button"
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
            className="qa-container__answer-btn clay-morphism-button"
            style={applyStyle(2)}
            onClick={() =>
              handleSelectedAnswer(question, index, answers[2].answer)
            }
          >
            {answers[2].answer}
          </button>
          <button
            className="qa-container__answer-btn clay-morphism-button"
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
