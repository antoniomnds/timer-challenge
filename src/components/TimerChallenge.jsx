import {useRef, useState} from "react";
import ResultModal from "./ResultModal";

const TIMER_INTERVAL = 10;

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // automatic timer stop
  if (timeRemaining < 0) {
    dialog.current.open();
    clearInterval(timer.current);
  }

  function handleStart() {
    // noinspection JSValidateTypes
    timer.current = setInterval(
      () => setTimeRemaining(prevTime => prevTime - TIMER_INTERVAL),
      TIMER_INTERVAL
    );
  }

  // manually stopping the timer
  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        timeRemaining={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 && 's'}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}