import React from "react"

export default function QAContainer({question, answers, selectedAnswer}) {
    return (
        <div className="q-a-container">
            <h3 className="question">{question}</h3>
            <button onClick={selectedAnswer}>{answers[0]}</button>
            <button onClick={selectedAnswer}>{answers[1]}</button>
            <button onClick={selectedAnswer}>{answers[2]}</button>
            <button onClick={selectedAnswer}>{answers[3]}</button>
        </div>
    )
}