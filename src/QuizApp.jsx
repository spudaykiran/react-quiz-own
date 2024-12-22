import { data, answers } from "./data";
import { useEffect, useState } from "react";
const SECONDS_PER_QUESTIONS = 30;
function QuizApp({ setIsStarted }) {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(
    data.length * SECONDS_PER_QUESTIONS
  );
  const constTime = data.length * SECONDS_PER_QUESTIONS;

  useEffect(
    function () {
      const interval = setInterval(function () {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1);
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return function () {
        clearInterval(interval);
      };
    },
    [timeRemaining]
  );

  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  function handleClick() {
    if (selectedOption === "") return;
    if (index < data.length) {
      setIndex(index + 1);
      setSelectedOption("");
    }
    if (selectedOption === answers[index]) {
      setScore(score + 1);
    }
  }
  function handleReset() {
    setHighScore(highScore < score ? score : highScore);
    setScore(0);
    setSelectedOption("");
    setIndex(0);
    setTimeRemaining(data.length * SECONDS_PER_QUESTIONS);
  }
  return (
    <div className="main-container">
      {index < 10 && timeRemaining > 0 ? (
        <div className="question-container">
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${(timeRemaining / constTime) * 100}%`,
              }}
            ></div>
          </div>

          <h3>{`${index + 1} . ${data[index].Question}`}</h3>
          <ul>
            <li
              className={selectedOption === "option1" ? "selected" : ""}
              onClick={(e) => setSelectedOption("option1")}
            >
              {data[index].option1}
            </li>
            <li
              className={selectedOption === "option2" ? "selected" : ""}
              onClick={(e) => setSelectedOption("option2")}
            >
              {data[index].option2}
            </li>
            <li
              className={selectedOption === "option3" ? "selected" : ""}
              onClick={(e) => setSelectedOption("option3")}
            >
              {data[index].option3}
            </li>
            <li
              className={selectedOption === "option4" ? "selected" : ""}
              onClick={(e) => setSelectedOption("option4")}
            >
              {data[index].option4}
            </li>
          </ul>
          <div className="buttons">
            <button
              className={
                timeRemaining >= constTime / 2
                  ? "timer green-color"
                  : "timer red-color"
              }
            >
              {mins < 10 && "0"}
              {mins} : {secs < 10 && "0"}
              {secs}
            </button>
            <button
              className={`${selectedOption === "" ? "pointer next" : "next"} `}
              onClick={handleClick}
            >
              {index < 9 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      ) : (
        <div className="finish-container">
          <h3>Quiz completed</h3>
          <p style={{ color: `${score <= 5 ? "red" : "green"}` }}>
            {highScore < score
              ? `This is Your highest score till now : ${score} ${
                  score >= 5 ? "💪" : "🤨"
                }`
              : `Your score is: ${score} ${score >= 5 ? "💪" : "🤨"}`}
          </p>
          <p>Your Highest score: {highScore}</p>
          <div className="finish-buttons">
            <button onClick={handleReset}>Restart</button>
            <button onClick={() => setIsStarted(false)}>Finish</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
