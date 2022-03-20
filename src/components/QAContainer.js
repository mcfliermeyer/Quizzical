import React from "react"

export default function QAContainer({question, answers, selectedAnswer}) {
    return (
        <div className="q-a-container">
            <h3 className="question">{question}</h3>
            <button onClick={() => selectedAnswer(question, answers[0])}>{answers[0]}</button>
            <button onClick={() => selectedAnswer(question, answers[1])}>{answers[1]}</button>
            <button onClick={() => selectedAnswer(question, answers[2])}>{answers[2]}</button>
            <button onClick={() => selectedAnswer(question, answers[3])}>{answers[3]}</button>
        </div>
    )
}