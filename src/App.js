import "./App.css";
import { Buffer } from "buffer";
import React, { useState, useReducer } from "react";
import QAContainer from "./components/QAContainer";
import randomizeArray from "./utilities/randomizeArray";
import SubmitAnswers from "./components/SubmitAnswers";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, {});

  function reducer(state, action) {
    switch (action.type) {
      case "INITSTATE":
        return {...action.payload};
      case "ANSWERSELECTED":
        return {...state, ...action.payload}
      case "SUBMITANSWERS":

        console.log(`here is in payload`)
        console.log(action.payload);
        console.log(state)
        return {...state, finalAnswerStyles: action.payload}
      default:
        return;
    }
  }

  const modal = document.querySelector(".modal");

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetcher = await fetch(
        // "https://opentdb.com/api.php?amount=6&category=30&difficulty=easy&type=multiple"
        `https://opentdb.com/api.php?amount=2&difficulty=easy&type=multiple&encode=base64`
      );
      const res = await fetcher.json();
      const stateFromApi = setInitialState(res)
      dispatch({type: 'INITSTATE', payload: stateFromApi})
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function setInitialState(apiData) {
    const answerKey = setAnswerKeyFromApiData(apiData);
    const questionsAndAnswers = setQuestionsAndRandomizedAnswersFromApiData(apiData); //prettier-ignore
    const userAnswers = {}
    const finalAnswerStyles = []
    return {
      answerKey: answerKey,
      questionsAndAnswers: questionsAndAnswers,
      userAnswers: userAnswers,
      finalAnswerStyles: finalAnswerStyles
    }
  }

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
    const newAnswers = {...state.userAnswers, [question]: answer}
    const newPayload = {questionsAndAnswers: newState, userAnswers: newAnswers}
    dispatch({type: 'ANSWERSELECTED', payload: newPayload})
  };

  function allQuestionsAnswered() {
    //check if all questions are answered
    if (Object.keys(state.userAnswers).length !== Object.keys(state.questionsAndAnswers).length) {
      console.log("please answer all questions");
      return false;
    }
    console.log("returning true")
    console.log(state)
    return true;
  }

  function setFinalAnswerStyle() {
    if (allQuestionsAnswered()) {
      const correctAnswerStyle = {
        backgroundColor: "#30DB1A",
      };
      const wrongAnswerStyle = {
        backgroundColor: "#F02719",
      };
      const selectedAnswer = {
        boxShadow: "inset 0 5px 8px 2px rgba(0, 0, 0, 0.5)",
      };
      const notSelectedAnswer = {
        boxShadow: "0 5px 8px rgba(0, 0, 0, 0.5), inset 0 -2px 6px 2px rgba(0, 0, 0, 0.5)", //prettier-ignore
      };
      const answerStyles = state.questionsAndAnswers.map((questionObject) => {
        //questionObject has form {question: question, answers: [answers(4)]}
        const question = questionObject.question;
        const answers = questionObject.answers;
        const mappedAnswerStyles = answers.map((answerObject) => {
          const answer = answerObject.answer;
          //if answer is selected and not in key, turn red
          if (
            state.answerKey[question] !== answer &&
            state.userAnswers[question] === answer
          ) {
            return { ...wrongAnswerStyle, ...selectedAnswer };
          }
          //if answer is in answer key, turn green, then check if answer is in user answers and increase correct answers
          if (state.answerKey[question] === answer) {
            if (state.userAnswers[question] === answer) {
              //todo add to correct answers
              return { ...correctAnswerStyle, ...selectedAnswer };
            }
            return { ...correctAnswerStyle, ...notSelectedAnswer };
          }
          return notSelectedAnswer;
        });
        return mappedAnswerStyles;
      });
      dispatch({ type: "SUBMITANSWERS", payload: answerStyles});
      //modal.show();
    }
  }

  return (
    <div className="app">
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        state.questionsAndAnswers.map((result, index) => {
          return (
            <QAContainer
              key={index}
              index={index}
              question={result.question}
              answers={result.answers}
              eachAnswerStyle={
                state.finalAnswerStyles.length > 0 ? state.finalAnswerStyles[index] : []
              }
              handleSelectedAnswer={handleSelectedAnswer}
            />
          );
        })
      )}
      {isLoading || <SubmitAnswers handleClick={setFinalAnswerStyle} />}
      <dialog className="modal">
        <h1>Please answer all questions</h1>
      </dialog>
    </div>
  );
};

export default App;
