import './App.css';
import React from "react"
import QAContainer from "./components/QAContainer";

const App = () => {

  const [apiData, setApiData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const fetcher = await fetch("https://opentdb.com/api.php?amount=5&category=30&difficulty=easy&type=multiple")
      const res = await fetcher.json()
      setApiData(() => res)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  function selectedAnswer() {
    console.log(`clicked`)
    console.log(apiData)
    //desturcture apiData
    const [q1, q2, q3, q4, q5] = apiData
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
  }

  function setQAComponents() {

  }

  return (
    <div>
      <QAContainer question={isLoading ? "loading" : apiData.results[0].question} answers={[1, 2, 3, 4]} selectedAnswer={selectedAnswer} />
    </div>
  )
}

export default App;