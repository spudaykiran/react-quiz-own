import QuizApp from "./QuizApp";
import { useState } from "react";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <div className="app">
      <h1 className="header">React Quiz</h1>
      {!isStarted && (
        <div className="start">
          <h1>Let's start the React Quiz</h1>
          <button onClick={() => setIsStarted(!isStarted)}>Start</button>
        </div>
      )}
      {isStarted && <QuizApp setIsStarted={setIsStarted} />}
    </div>
  );
}

export default App;
