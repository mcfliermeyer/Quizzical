import "./App.css";
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
        "https://opentdb.com/api.php?amount=5&category=30&difficulty=easy&type=multiple"
      );
      const res = await fetcher.json();
      setApiData(() => {
        setAnswerKey((prev) => {
          const fart = res.results.map((result) => {
            return {
              [result.question]: result.correct_answer,
            };
          });
          return Object.assign(...fart); //flattens array of objects into one object
        });
        const qaObject = res.results.map((result) => {
          const q = result.question;
          const a = randomizeArray([result.correct_answer, ...result.incorrect_answers]); //prettier-ignore
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
        backgroundColor: "green",
      };
      const wrongAnswerStyle = {
        backgroundColor: "red",
      };
      const defaultAnswerStyle = {
        backgroundColor: "white",
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
            return wrongAnswerStyle;
          }
          //if answer is in answer key, turn green, then check if answer is in user answers and increase correct answers
          if (answerKey[question] === answer) {
            if (userAnswers[question] === answer) {
              //todo add to correct answers
            }
            return correctAnswerStyle;
          }
          //otherwise keep default color
          return defaultAnswerStyle;
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
      {isLoading || <SubmitAnswers handleClick={setFinalAnswerStyle} />}
    </div>
  );
};

export default App;
