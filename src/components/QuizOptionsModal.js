import React, { useState } from "react";
import styled from "styled-components";
import RadioButtonGroup from "./RadioButtonGroup";
import {
  questionsInfo,
  categoryInfo,
  difficultyInfo,
} from "../utilities/radioBtnInfo";
import SubmitAnswersButton from "./SubmitAnswersButton";

const StyledQuizOptionsModal = styled.div`
  background-color: #e4ebf6;
  box-shadow: 60px 60px 120px #a0a5ac, -60px -60px 120px #ffffff;
  box-shadow: 35px 35px 60px #3c358c, -15px -15px 70px #9e8bff;
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  max-width: 800px;
  margin: 1rem auto;
  padding: 1rem 1rem;
  border: none;
  border-radius: 32px;
`;

const QuizOptionsModal = ({ quizOptions, onOptionsChange }) => {
  const [localQuizOptions, setLocalQuizOptions] = useState({
    numOfQuestions: 0,
    category: "",
    difficulty: "",
    isOption: true
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
    <StyledQuizOptionsModal className="modal">
      <RadioButtonGroup
        buttonsNeededInfo={questionsInfo}
        onValueChange={onValueChange}
        options={localQuizOptions}
        title="How Many Questions?"
      ></RadioButtonGroup>
      <RadioButtonGroup
        buttonsNeededInfo={categoryInfo}
        onValueChange={onValueChange}
        options={localQuizOptions}
        title="Genre"
      ></RadioButtonGroup>
      <RadioButtonGroup
        buttonsNeededInfo={difficultyInfo}
        onValueChange={onValueChange}
        options={localQuizOptions}
        title="Difficulty"
      ></RadioButtonGroup>
      <SubmitAnswersButton handleClick={handleSubmit} />
    </StyledQuizOptionsModal>
  );
};

export default QuizOptionsModal;
