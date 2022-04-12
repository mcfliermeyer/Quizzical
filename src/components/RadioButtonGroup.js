import React from "react";
import styled from "styled-components";
import uuid from "react-uuid";

const StyledRadioButtonGroup = styled.div`
  flex: 1;
  margin: 0.6rem;
  background-color: #574dce;
  border-radius: 20px;
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
    color: #5f6267ce;
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
    background: linear-gradient(145deg, #ffffff, #bfc5ce); //prettier-ignore
    border-radius: 20px;
  }
`;

const StyledButtonGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 1rem;
  padding: 1rem;
  text-align: center;
`;

const NeumorphicContainer = styled.div`
  border-radius: 50px;
  padding: 6px;
  background: #e4ebf6;
  box-shadow: inset 8px 8px 16px #b4bac2, inset -8px -8px 16px #ffffff;
  & h1 {
    color: #5f6267ce;
    display: block;
    text-align: center;
    padding: 1.2rem 1.5rem 0;
    font-size: 1rem;
    font-weight: 700;
    @media (min-width: 425px) {
      font-size: 1.2rem;
    }
    @media (min-width: 800px) {
      font-size: 1.4rem;
    }
  }
`;
const NeumorphicBorder = styled.div`
  margin: .7rem 1.5rem;
  padding: 4px;
  border-radius: 50px;
  background: #e4ebf6;
  box-shadow: 8px 8px 16px #b4bac2, -8px -8px 16px #ffffff;
`;

const RadioButtonGroup = ({ buttonsNeededInfo, onValueChange, options, title }) => {
  //prettier-ignore
  const buttonGroup = buttonsNeededInfo.map((buttonInfo, index) => {
      const styleOfButton =
        buttonInfo.style === undefined ? `` : buttonInfo.style;
      const selectedAnswer = () => {
        if (options.isOption) {
          return {
            background: `linear-gradient(145deg, #413A9B, #6D60FF)`,
            boxShadow: `inset 8px 8px 13px #2C2767, inset 9px 9px 10px #8374FF`,
            color: `#e4ebf6`,
            ...styleOfButton,
          };
        }
        return ({
          boxShadow: `8px 8px 16px 3px #574dce,
              -8px -8px 16px #ffffff`,
          background: `linear-gradient(145deg, #413A9B, #6D60FF)`,
          color: `#e4ebf6`,
          ...styleOfButton,
        })
      }
      const notSelectedAnswer = {
        boxShadow: "8px 8px 16px #5b5e62, -4px -4px 10px #ffffff", //prettier-ignore
        ...styleOfButton,
      };
      
    return (
          <StyledRadioButtonGroup key={uuid()}>
            <label
              style={
                options[buttonInfo.name] === buttonInfo.value
                  ? selectedAnswer()
                  : notSelectedAnswer
              }
            >
              <input
                className="radio"
                type="radio"
                name={buttonInfo.name}
                value={buttonInfo.value}
                checked={options[buttonInfo.name] === buttonInfo.value}
                onChange={onValueChange}
              />
              {buttonInfo.label}
            </label>
          </StyledRadioButtonGroup>
    );
  });
  return (
    <NeumorphicBorder>
      <NeumorphicContainer>
        <h1>{title}</h1>
        <StyledButtonGroupContainer>{buttonGroup}</StyledButtonGroupContainer>
      </NeumorphicContainer>
    </NeumorphicBorder>
  );
};

export default RadioButtonGroup;
