import React, {useState} from "react";
import styled from "styled-components";
import RadioButtonGroup from "./RadioButtonGroup";


const StyledQAContainer = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgb(228, 231, 234);
  max-width: 800px;
  margin: 1rem auto;
  @media (min-width: 425px) {
    font-size: 1rem;
  }
  @media (min-width: 800px) {
    font-size: 1.1rem;
  }
`;

function QAContainer({
  question,
  answers,
  index,
  handleSelectedAnswer,
  selectedAnswer,
  eachAnswerStyle,
}) {

  const buttonInfo = answers.map(answer => {
    return {
      name: question,
      value: answer.answer,
      label: answer.answer,
      index: index,
    }
  })

  let optionAnswer = () => {
    if (selectedAnswer[question] === undefined) {
      return ""
    }
    else{
      return selectedAnswer[question]
    }
  }

  const onValueChange = (event) => {
    const question = event.target.name
    const answer = event.target.value
    optionAnswer = selectedAnswer[answer]
    handleSelectedAnswer(question, index, answer)
  }
  
  return (
    <StyledQAContainer>
      <RadioButtonGroup
        buttonsNeededInfo={buttonInfo}
        onValueChange={onValueChange}
        options={{[question]: optionAnswer().answer}}
      />
      {/* <h3 className="question">{question}</h3>
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
      </div> */}
    </StyledQAContainer>
  );
}

export default QAContainer;
