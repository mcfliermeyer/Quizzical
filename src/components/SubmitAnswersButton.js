import React from "react";
import "../App.css";
import styled from "styled-components";

const StyledSubmitAnswersButton = styled.button`
  background-color: ${(props) => props.theme.colors.clayButtonColor};
  color: ${(props) => props.theme.colors.fontColor};
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.5), inset 0 -2px 6px 2px rgba(0, 0, 0, 0.5);
`;

export default function SubmitAnswersButton({handleClick}) {
  return (
    <StyledSubmitAnswersButton
      className="submit-answers-btn"
      onClick={handleClick}
    >
      Submit
    </StyledSubmitAnswersButton>
  );
}
