import React from "react";
import { PomodoroTimer } from "./components/pomodoro-timer";

function App() {
  return (
    <div className="container">
      <PomodoroTimer pomodoroTime={5} shortRestTime={3} longRestTime={4} cycles={4} />
    </div>
  );
}

export default App;
