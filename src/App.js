import './App.css';
import React from "react"
import QAContainer from "./components/QAContainer";

const App = () => {

  const [apiData, setApiData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [answerKey, setAnswerKey] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const fetcher = await fetch("https://opentdb.com/api.php?amount=5&category=30&difficulty=easy&type=multiple")
      const res = await fetcher.json()
      setApiData(() => {
        console.log(res)
        setAnswerKey(prev => {
          return res.results.map(result => {
            return {
              question: result.question,
              answer: result.correct_answer
            }
          })
        })
        return res
      })
      setIsLoading(false)
    }
    fetchData()
  }, [])

  function selectedAnswer(question, answer) {
    console.log(`question: ${question}, answer: ${answer}`)
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
  }

  function setQAComponents(data) {
    return data.results.map(result => {
      const question = result.question
      const correctAnswer = result.correct_answer
      const allAnswersInRandomOrder = randomizeArray([correctAnswer ,...result.incorrect_answers])
      return (
        <QAContainer key={isLoading ? "Loading From Database" : question} question={isLoading ? "Loading From Database" : question} answers={allAnswersInRandomOrder} selectedAnswer={selectedAnswer} />
      )
    })
  }

  function randomizeArray(array) {
    if (array.length === 1) {
      return array
    }
    const randomArrayElement = array[Math.floor(Math.random() * array.length)]
    const removedElementArray = array.filter(e => e !== randomArrayElement)
    return [randomArrayElement, ...randomizeArray(removedElementArray)]
  }

  return (
    <div>
      {isLoading ? <h1>Loading</h1> : setQAComponents(apiData)}
    </div>
  )
}

export default App;