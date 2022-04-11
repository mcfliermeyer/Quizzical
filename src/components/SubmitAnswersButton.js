import React from "react";
import styled from "styled-components";

const StyledSubmitAnswersButton = styled.button`
  display: block;
  border: none;
  border-radius: 15px;
  padding: clamp(1rem, 1.2rem, 2rem) clamp(2rem, 5rem, 6rem);
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  color: #e4ebf6;
  font-weight: 700;
  font-size: 0.8rem;
  @media (min-width: 425px) {
    font-size: 0.95rem;
  }
  @media (min-width: 800px) {
    font-size: 1.1rem;
  }
  box-shadow: 8px 8px 16px #5b5e62, -8px -8px 16px #ffffff;
  background: linear-gradient(145deg, #8b7ffe, #6155e5);
  border-radius: 20px;
`;

export default function SubmitAnswersButton({handleClick, isQuizOver, newGame}) {
  return (
    <StyledSubmitAnswersButton
      onClick={isQuizOver ? newGame : handleClick}
    >
      {isQuizOver ? "Play Again?" : "Submit"}
    </StyledSubmitAnswersButton>
  );
}
