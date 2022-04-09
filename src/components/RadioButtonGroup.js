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
    color: #96a0bb;
    font-size: 0.8rem;
    font-weight: 700;
    @media (min-width: 425px) {
      font-size: 1rem;
      padding: 0.9rem 1.5rem;
    }
    @media (min-width: 800px) {
      font-size: 1.2rem;
      padding: 1.1rem 2rem;
    }
    min-height: 100%;

    box-shadow: 8px 8px 16px #5b5e62, -8px -8px 16px #ffffff;
    background: linear-gradient(145deg, #f4fbff, #cdd4dd);
    border-radius: 20px;
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
        boxShadow: `8px 8px 16px #5b5e62,
             -8px -8px 16px #ffffff`,
        background: `linear-gradient(145deg, #cdd4dd, #f4fbff)`,
        color: `#6c5efe`,
      };
      const notSelectedAnswer = {
        boxShadow: "8px 8px 16px #5b5e62, -8px -8px 16px #ffffff", //prettier-ignore
        
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
