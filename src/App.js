import "./App.css";
import { Buffer } from "buffer";
import React from "react";
import QAContainer from "./components/QAContainer";
import randomizeArray from "./utilities/randomizeArray";
import SubmitAnswers from "./components/SubmitAnswers";

const App = () => {
  const [apiData, setApiData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [answerKey, setAnswerKey] = React.useState({});
  const [userAnswers, setUserAnswers] = React.useState({});
  const [finalAnswerStyles, setFinalAnswerStyles] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetcher = await fetch(
        // "https://opentdb.com/api.php?amount=6&category=30&difficulty=easy&type=multiple"
        `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=base64`
      );
      const res = await fetcher.json();
      setApiData(() => {
        setAnswerKey((prev) => {
          const fart = res.results.map((result) => {
            const question = Buffer.from(result.question, "base64").toString("ascii") //prettier-ignore
            const correctAnswer = Buffer.from(result.correct_answer, "base64").toString("ascii") //prettier-ignore
            return {
              [question]: correctAnswer,
            };
          });
          return Object.assign(...fart); //flattens array of objects into one object
        });
        const qaObject = res.results.map((result) => {
          const q = Buffer.from(result.question, "base64").toString("ascii") //prettier-ignore
          const correctA = Buffer.from(result.correct_answer, "base64").toString("ascii") //prettier-ignore
          console.log(result.incorrect_answers.length)
          const incorrectAnswers = result.incorrect_answers.map(a => Buffer.from(a, "base64").toString('ascii'))
          console.log(incorrectAnswers)
          // const incorrectA1 = Buffer.from(result.incorrect_answers[0], "base64").toString("ascii") //prettier-ignore
          // const incorrectA2 = Buffer.from(result.incorrect_answers[1], "base64").toString("ascii") //prettier-ignore
          // const incorrectA3 = Buffer.from(result.incorrect_answers[2], "base64").toString("ascii") //prettier-ignore
          const a = randomizeArray([correctA, ...incorrectAnswers]); //prettier-ignore
          return {
            question: q,
            answers: a.map((result) => ({ answer: result, isSelected: false })),
          };
        });
        return qaObject;
      });
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleSelectedAnswer = (question, index, answer) => {
    setApiData((oldData) => {
      const newApiData = oldData.map((obj, i) => {
        if (index === i) {
          return {
            question: obj.question,
            answers: obj.answers.map((mapAnswer) => {
              if (mapAnswer.answer === answer) {
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
      return newApiData;
    });
    setUserAnswers((oldAnswers) => {
      return {
        ...oldAnswers,
        [question]: answer,
      };
    });
  };

  function allQuestionsAnswered() {
    //check if all questions are answered
    if (Object.keys(userAnswers).length !== Object.keys(apiData).length) {
      console.log("please answer all questions");
      return false;
    }
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
      const answerStyles = apiData.map((questionObject) => {
        //questionObject has form {question: question, answers: [answers(4)]}
        const question = questionObject.question;
        const answers = questionObject.answers;
        const mappedAnswerStyles = answers.map((answerObject) => {
          const answer = answerObject.answer
          //if answer is selected and not in key, turn red
          if (
            answerKey[question] !== answer &&
            userAnswers[question] === answer
          ) {
            return {...wrongAnswerStyle, ...selectedAnswer};
          }
          //if answer is in answer key, turn green, then check if answer is in user answers and increase correct answers
          if (answerKey[question] === answer) {
            if (userAnswers[question] === answer) {
              //todo add to correct answers
              return {...correctAnswerStyle, ...selectedAnswer}
            }
            return {...correctAnswerStyle, ...notSelectedAnswer};
          }
          return notSelectedAnswer
        });
        return mappedAnswerStyles
      });
      setFinalAnswerStyles(answerStyles)
    } 
  }

  return (
    <div className="app">
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        apiData.map((result, index) => {
          return (
            <QAContainer
              key={index}
              index={index}
              question={result.question}
              answers={result.answers}
              eachAnswerStyle={
                finalAnswerStyles.length > 0 ? finalAnswerStyles[index] : []
              }
              handleSelectedAnswer={handleSelectedAnswer}
            />
          );
        })
      )}
      {isLoading || (
        <SubmitAnswers
          handleClick={setFinalAnswerStyle}
        />
      )}
    </div>
  );
};

export default App;
