import React, { useState } from "react";
import styled from "styled-components";
import RadioButtonGroup from "./RadioButtonGroup";
import {
  questionsInfo,
  categoryInfo,
  difficultyInfo,
} from "../utilities/radioBtnInfo";
import SubmitAnswersButton from "./SubmitAnswersButton";

const StyledQuizOptionsModal = styled.dialog`
  background-color: #e4ebf6;
  box-shadow: 60px 60px 120px #a0a5ac, -60px -60px 120px #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 1rem;
  border: none;
  border-radius: 32px;
`;

const QuizOptionsModal = ({ quizOptions, onOptionsChange }) => {
  const [localQuizOptions, setLocalQuizOptions] = useState({
    numOfQuestions: 0,
    category: "",
    difficulty: "",
  });

  function onValueChange(event) {
    //legit should not do this but it works
    if (event.target.value.length <= 2) {
      setLocalQuizOptions((oldOptions) => {
        return {
          ...oldOptions,
          numOfQuestions: +event.target.value,
        };
      });
    } else {
      setLocalQuizOptions((oldOptions) => {
        return {
          ...oldOptions,
          [event.target.name]: event.target.value,
        };
      });
    }
  }
  function handleSubmit() {
    onOptionsChange({ ...localQuizOptions, modalVisible: false });
  }
  return (
    <StyledQuizOptionsModal open className="modal">
      <RadioButtonGroup
        buttonsNeededInfo={questionsInfo}
        onValueChange={onValueChange}
        options={localQuizOptions}
      ></RadioButtonGroup>
      <RadioButtonGroup
        buttonsNeededInfo={categoryInfo}
        onValueChange={onValueChange}
        options={localQuizOptions}
      ></RadioButtonGroup>
      <RadioButtonGroup
        buttonsNeededInfo={difficultyInfo}
        onValueChange={onValueChange}
        options={localQuizOptions}
      ></RadioButtonGroup>
      <SubmitAnswersButton handleClick={handleSubmit} />
    </StyledQuizOptionsModal>
  );
};

export default QuizOptionsModal;
