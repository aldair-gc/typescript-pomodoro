import React, { useEffect, useState } from "react";
import { useInterval } from "../hooks/use-interval";
import { secToTime } from "../utils/sec-to-time";
import { Button } from "./button";
import { Timer } from "./timer";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require("../sounds/bell-start.mp3");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require("../sounds/bell-finish.mp3");

const audioStartWorking = new Audio(bellStart);
const audioFinishWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cycles, setCycles] = useState(new Array(props.cycles - 1).fill(true));
  const [cyclesCount, setCyclesCount] = useState(0);
  const [workingCount, setWorkingCount] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");

    if (mainTime > 0) return;
    if (working && cycles.length > 0) {
      configureRest(false);
      cycles.pop();
    } else if (working && cycles.length <= 0) {
      configureRest(true);
      setCycles(new Array(props.cycles - 1).fill(true));
      setCyclesCount(cyclesCount + 1);
    }

    if (working) setPomodoroCount(pomodoroCount + 1);
    if (resting) configureWork();
  }, [working, resting, mainTime, cycles]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setWorkingCount(workingCount + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  };

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    setMainTime(long ? props.longRestTime : props.shortRestTime);
    audioFinishWorking.play();
  };

  const pausePlay = () => {
    setTimeCounting(!timeCounting);
  };

  return (
    <div className="pomodoro">
      <h2>{working ? "Working" : "Resting"}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />
        <Button text="Rest" onClick={() => configureRest(false)} />
        <Button
          className={!working && !resting ? "hidden" : ""}
          text={timeCounting ? "Pause" : "Start"}
          onClick={() => pausePlay()}
        />
      </div>
      <div className="details">
        <p>Completed cycles: {cyclesCount}</p>
        <p>Time working: {secToTime(workingCount)}</p>
        <p>Finished pomodoros: {pomodoroCount}</p>
      </div>
    </div>
  );
}
