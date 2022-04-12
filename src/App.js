import { Buffer } from "buffer";
import React, { useState, useReducer } from "react";
import QAContainer from "./components/QAContainer";
import randomizeArray from "./utilities/randomizeArray";
import SubmitAnswersButton from "./components/SubmitAnswersButton";
import QuizOptionsModal from "./components/QuizOptionsModal";
import StyledParentContainer from "./components/StyledParentContainer";
import getIdWithName from "./utilities/categoryAndId.js";
import { ThemeProvider } from "styled-components";
import { theme } from "./utilities/themeStyles";
import uuid from "react-uuid";

const App = () => {
  const [quizOptions, setQuizOptions] = useState({
    numOfQuestions: 0,
    category: "Any",
    difficulty: "Any",
    modalVisible: true,
  });
  const [selectedAnswersWithQuestions, setSelectedAnswersWithQuestions] = useState({})
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [state, dispatch] = useReducer(reducer, {});

  function reducer(state, action) {
    switch (action.type) {
      case "INITSTATE":
        return { ...action.payload };
      case "ANSWERSELECTED":
        return { ...state, ...action.payload };
      case "SUBMITANSWERS":
        return { ...state, finalAnswerStyles: action.payload };
      default:
        return;
    }
  }

  React.useEffect(() => {
    const category =
      quizOptions.category === "Any"
        ? ""
        : `&category=${getIdWithName(quizOptions.category)}`;
    const difficulty =
      quizOptions.difficulty === "Any"
        ? ""
        : `&difficulty=${quizOptions.difficulty}`;
    async function fetchData() {
      const fetcher = await fetch(
        `https://opentdb.com/api.php?amount=${quizOptions.numOfQuestions}${category}${difficulty}&type=multiple&encode=base64`
      );
      const res = await fetcher.json();
      const initialState = (res) => {
        const dataLoaded = res.results.length > 0;
        return {
          answerKey: dataLoaded ? setAnswerKeyFromApiData(res) : null,
          questionsAndAnswers: dataLoaded ? setQuestionsAndRandomizedAnswersFromApiData(res) : null, //prettier-ignore
          userAnswers: {},
          finalAnswerStyles: [],
        };
      };
      dispatch({ type: "INITSTATE", payload: initialState(res) });
    }
    fetchData();
  }, [quizOptions]);

  function setAnswerKeyFromApiData(apiData) {
    //returns one large object with all q:a key value pairs
    const answerKey = apiData.results.map((result) => {
      const question = Buffer.from(result.question, "base64").toString("ascii") //prettier-ignore
      const correctAnswer = Buffer.from(result.correct_answer, "base64").toString("ascii") //prettier-ignore
      return {
        [question]: correctAnswer,
      };
    });
    return Object.assign(...answerKey); //flattens array of objects into one object
  }

  function setQuestionsAndRandomizedAnswersFromApiData(apiData) {
    //returns object of [{question: q, answers:[{answer: a, isSeleted}]},...]
    return apiData.results.map((result) => {
      const question = Buffer.from(result.question, "base64").toString("ascii") //prettier-ignore
      const correctAnswer = Buffer.from(result.correct_answer, "base64").toString("ascii") //prettier-ignore
      const incorrectAnswers = result.incorrect_answers.map((answer) =>
        Buffer.from(answer, "base64").toString("ascii")
      );
      const allAnswers = randomizeArray([correctAnswer, ...incorrectAnswers]); //prettier-ignore
      return {
        question: question,
        answers: allAnswers.map((result) => ({
          answer: result,
          isSelected: false,
        })),
      };
    });
  }

  const handleSelectedAnswer = (question, index, answer) => {
    setSelectedAnswersWithQuestions(old => {
      return ({
        ...old,
        [question]: {answer: answer, index: index}
      })
    })
    const newState = state.questionsAndAnswers.map((obj, i) => {
      if (index === i) {
        return {
          question: obj.question,
          answers: obj.answers.map((mapAnswer) => {
            if (mapAnswer.answer === answer) {
              //checks if answer clicked is the same, if not, select new answer and default others
              return mapAnswer.isSelected
                ? {
                    answer: mapAnswer.answer,
                    isSelected: true,
                  }
                : {
                    answer: mapAnswer.answer,
                    isSelected: !mapAnswer.isSelected,
                  };
            } else {
              return {
                answer: mapAnswer.answer,
                isSelected: false,
              };
            }
          }),
        };
      } else {
        return obj;
      }
    });
    const newAnswers = { ...state.userAnswers, [question]: answer };
    const newPayload = {
      questionsAndAnswers: newState,
      userAnswers: newAnswers,
    };
    dispatch({ type: "ANSWERSELECTED", payload: newPayload });
  };

  function setFinalAnswerStyle() {
    const allQuestionsAnswered = Object.keys(state.userAnswers).length === Object.keys(state.questionsAndAnswers).length; //prettier-ignore
    if (allQuestionsAnswered) {
      const correctAnswerStyle = {
        boxShadow: `8px 8px 16px 3px #136108, -8px -8px 16px #ffffff`,
        background: `linear-gradient(145deg, #1FA10E, #136108)`,
        color: `#e4ebf6`,
      };
      const wrongAnswerStyle = {
        boxShadow: `8px 8px 16px 3px #87260F, -8px -8px 16px #ffffff`, //87260F
        background: `linear-gradient(145deg, #6b1d0c, #E34119)`,
        color: `#e4ebf6`,
      };
      const genericStyle = {
        background: `linear-gradient(145deg, #ffffff, #bfc5ce)`,
        color: `#5f6267ce`,
        boxShadow: "8px 8px 16px #5b5e62, -4px -4px 10px #ffffff",
      };
      const answerStyles = state.questionsAndAnswers.map((questionObject) => {
        const question = questionObject.question;
        const answers = questionObject.answers;
        const mappedAnswerStyles = answers.map((answerObject) => {
          const answer = answerObject.answer;
          //if answer is selected and not in key, turn red
          if (
            state.answerKey[question] !== answer &&
            state.userAnswers[question] === answer
          ) {
            return { ...wrongAnswerStyle};
          }
          //if answer is in answer key, turn green, then check if answer is in user answers and increase correct answers
          if (state.answerKey[question] === answer) {
            if (state.userAnswers[question] === answer) {
              return { ...correctAnswerStyle, ...{background: `linear-gradient(145deg, #136108, #1FA10E)`}}
            }
            return { ...correctAnswerStyle};
          }
          return genericStyle;
        });
        return mappedAnswerStyles;
      });
      dispatch({ type: "SUBMITANSWERS", payload: answerStyles });
      setIsQuizOver((quizOver) => !quizOver);
    }
  }

  function changeOptions(optionChange) {
    setQuizOptions((oldOptions) => optionChange);
  }

  function newGame() {
    setQuizOptions((oldOptions) => {
      return {
        ...oldOptions,
        numOfQuestions: 0,
        category: "Any",
        difficulty: "Any",
        modalVisible: true,
      };
    });
    setIsQuizOver((oldVal) => !oldVal);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {state.questionsAndAnswers && (
          <StyledParentContainer>
            {state.questionsAndAnswers &&
              state.questionsAndAnswers.map((result, index) => {
                return (
                  <QAContainer
                    key={uuid()}
                    index={index}
                    question={result.question}
                    answers={result.answers}
                    selectedAnswer={selectedAnswersWithQuestions}
                    eachAnswerStyle={
                      state.finalAnswerStyles.length > 0
                        ? state.finalAnswerStyles[index]
                        : []
                    }
                    handleSelectedAnswer={handleSelectedAnswer}
                  />
                );
              })}
            {!quizOptions.modalVisible && (
              <SubmitAnswersButton
                handleClick={setFinalAnswerStyle}
                isQuizOver={isQuizOver}
                newGame={newGame}
              />
            )}
          </StyledParentContainer>
        )}
        {quizOptions.modalVisible && (
          <QuizOptionsModal
            quizOptions={quizOptions}
            onOptionsChange={changeOptions}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
