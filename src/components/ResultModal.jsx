import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

const ResultModal =
  forwardRef(function ResultModal({targetTime, timeRemaining, onReset}, ref) {
    const dialog = useRef();

    const userLost = timeRemaining < 0;
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      }
    });

    return createPortal(
      <dialog ref={dialog} className="result-modal" onClose={onReset}>
        {userLost ? <h2>You lost!</h2> : <h2>Your score: {score}</h2>}
        <p>The target was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong>{formattedTimeRemaining} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}> {/* form is submitted with the close button */}
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById('modal')
    );
  });

export default ResultModal;