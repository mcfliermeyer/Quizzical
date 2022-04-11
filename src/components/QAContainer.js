import React from "react";
import styled from "styled-components";
import RadioButtonGroup from "./RadioButtonGroup";


const StyledQAContainer = styled.div`
  padding: .2rem .1rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgb(228, 231, 234);
  max-width: 700px;
  margin: .1rem auto;
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

  const buttonInfo = answers.map((answer, answerIndex) => {
    const style = eachAnswerStyle.length > 0 ? eachAnswerStyle[answerIndex] : []
    return {
      name: question,
      value: answer.answer,
      label: answer.answer,
      index: index,
      style: style,
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
        title={question}
      />
    </StyledQAContainer>
  );
}

export default QAContainer;
