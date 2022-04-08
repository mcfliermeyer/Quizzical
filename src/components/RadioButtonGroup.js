import React from "react";
import styled from "styled-components";
import uuid from "react-uuid";

const StyledRadioButtonGroup = styled.div`
  .radio {
    opacity: 0;
    position: absolute;
    display: inline-block;
  }
  & label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 1.2rem;
    background-color: ${(props) => props.theme.colors.clayButtonColor};
    color: white;
    border-radius: 12px;
    box-shadow: ${(props) => props.theme.boxShadows.notSelected};
    font-size: 0.8rem;
    @media (min-width: 425px) {
      font-size: 1rem;
      padding: 0.9rem 1.5rem;
    }
    @media (min-width: 800px) {
      font-size: 1.2rem;
      padding: 1.1rem 2rem;
    }
    min-height: 100%;
  }
`;

const StyledButtonGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 1rem;
  text-align: center;
`;

const RadioButtonGroup = ({
  buttonsNeededInfo,
  onValueChange,
  quizOptions,
}) => {
  //prettier-ignore
  const buttonGroup = buttonsNeededInfo.map((buttonInfo, index) => {
      const selectedAnswer = {
        boxShadow:
          "inset 0 5px 8px 2px rgba(0, 0, 0, 0.2), inset 2px 5px 8px 2px rgba(0, 0, 0, 0.4), inset -2px 5px 8px 2px rgba(0, 0, 0, 0.4)",
      };
      const notSelectedAnswer = {
        boxShadow: "0 5px 8px rgba(0, 0, 0, 0.5), inset 0 -2px 6px 2px rgba(0, 0, 0, 0.5)", //prettier-ignore
      };
      const flexItem = {flex: "1", margin: ".5rem"}
      
    return (
      <StyledRadioButtonGroup key={uuid()} style={flexItem}>
        <label style={(quizOptions[buttonInfo.name] === buttonInfo.value ? selectedAnswer : notSelectedAnswer)}>
          <input
            className="radio"
            type="radio"
            name={buttonInfo.name}
            value={buttonInfo.value}
            checked={quizOptions[buttonInfo.name] === buttonInfo.value}
            onChange={onValueChange}
          />
          {buttonInfo.label}
        </label>
      </StyledRadioButtonGroup>
    );
  });
  return <StyledButtonGroupContainer>{buttonGroup}</StyledButtonGroupContainer>;
};

export default RadioButtonGroup;
