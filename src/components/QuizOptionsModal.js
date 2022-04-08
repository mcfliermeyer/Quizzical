import React, { useState } from "react";
import styled from "styled-components";
import RadioButtonGroup from "./RadioButtonGroup";
import {
  questionsInfo,
  categoryInfo,
  difficultyInfo,
} from "../utilities/radioBtnInfo";
import uuid from "react-uuid";
import SubmitAnswersButton from "./SubmitAnswersButton";

const StyledQuizOptionsModal = styled.dialog`
  background-color: ${(props) => props.theme.colors.containerColor};
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  width: 100%;
  padding: 1rem 1rem;
  position: absolute;
  top: -1rem;
  left: 0;
  z-index: 0;
  border: none;
  border-radius: 15px;
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
    onOptionsChange({...localQuizOptions, modalVisible: false})
  }
  if (quizOptions.modalVisible) {
    return (
      <StyledQuizOptionsModal open className="modal">
        <RadioButtonGroup
          buttonsNeededInfo={questionsInfo}
          onValueChange={onValueChange}
          quizOptions={localQuizOptions}
        ></RadioButtonGroup>
        <RadioButtonGroup
          buttonsNeededInfo={categoryInfo}
          onValueChange={onValueChange}
          quizOptions={localQuizOptions}
        ></RadioButtonGroup>
        <RadioButtonGroup
          buttonsNeededInfo={difficultyInfo}
          onValueChange={onValueChange}
          quizOptions={localQuizOptions}
        ></RadioButtonGroup>
        <SubmitAnswersButton handleClick={handleSubmit} />
      </StyledQuizOptionsModal>
    );
  } else {
    console.log("no longer visible")
    return (
      <></>
    );
  }
};

export default QuizOptionsModal;
