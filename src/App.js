import "./App.css";
import React from "react";
import QAContainer from "./components/QAContainer";
import randomizeArray from "./utilities/randomizeArray";
import SubmitAnswers from "./components/SubmitAnswers";

//TODO: style components
// responsive layout is done
//refactor logic
//possibly useContext or useReducer?

const App = () => {
  const [apiData, setApiData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [answerKey, setAnswerKey] = React.useState({});
  const [userAnswers, setUserAnswers] = React.useState({});

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
          return { question: q, answers: a.map(result => ({answers: result, isSelected: false})) };
        });
        return qaObject;
      });
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleSelectedAnswer = (userQuestion, userAnswer) => {
    //desturcture apiData
    // category: "Science: Gadgets"
    // correct_answer: "1996"
    // difficulty: "easy"
    // incorrect_answers: Array(3)
    // 0: "1989"
    // 1: "1992"
    // 2: "1990"
    // length: 3
    // [[Prototype]]: Array(0)
    // question: "When was the Tamagotchi digital pet released?"
    // type: "multiple"

    setUserAnswers((oldAnswers) => {
      return {
        ...oldAnswers,
        [userQuestion]: userAnswer,
      };
    });

    checkAnswers();
  };

  function checkAnswers() {
    //check if all questions are answered
    if (Object.keys(userAnswers).length !== apiData.length) {
      console.log("please answer all questions");
    }
    const allKeys = Object.keys(answerKey);

    allKeys.forEach((key) => {
      if (userAnswers[key] === answerKey[key]) {
        //will compare the answers using state
        console.log(userAnswers[key]);
        console.log(answerKey[key]);
      } else {
        console.log("wrong!!!");
      }
    });
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
              question={result.question}
              answers={result.answers}
              userAnswers={userAnswers}
              selectedAnswer={handleSelectedAnswer}
            />
          );
        })
      )}
      {isLoading || <SubmitAnswers />}
    </div>
  );
};

export default App;
