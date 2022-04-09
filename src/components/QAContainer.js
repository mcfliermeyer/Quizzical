import React from "react";
import "../App.css";
import styled from "styled-components";

const StyledQAContainer = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgb(228, 231, 234);
  max-width: 800px;
  margin: 1rem auto;
  background: ${(props) => props.theme.colors.containerColor};
  @media (min-width: 425px) {
    font-size: 1rem;
  }
  @media (min-width: 800px) {
    font-size: 1.1rem;
  }
  //border-radius: 15px;
  //box-shadow: ${(props) => props.theme.boxShadows.indentedGlass};
  .clay-morphism-button {
    border: none;
    border-radius: 15px;
    background: ${(props) => props.theme.colors.clayButtonColor};
    color: ${(props) => props.theme.colors.fontColor};
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 0.8rem;
    @media (min-width: 425px) {
      font-size: 1rem;
      padding: 0.9rem 1.5rem;
    }
    @media (min-width: 800px) {
      font-size: 1.2rem;
      padding: 1.1rem 1.7rem;
    }
    box-shadow: ${(props) => props.theme.boxShadows.buttonNotSelected};
  }
`;

function QAContainer({
  question,
  answers,
  index,
  handleSelectedAnswer,
  eachAnswerStyle,
}) {

  const selectedStyle = {
    boxShadow:
      "inset 0 5px 8px 2px rgba(0, 0, 0, 0.2), inset 2px 5px 8px 2px rgba(0, 0, 0, 0.4), inset -2px 5px 8px 2px rgba(0, 0, 0, 0.4)",
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
    <StyledQAContainer>
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
    </StyledQAContainer>
  );
}

export default QAContainer;
