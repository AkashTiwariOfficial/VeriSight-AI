import { useEffect } from "react";
import { useExam } from "../context/ExamContext";

const BehaviorTracker = () => {
  const { dispatch } = useExam();

  useEffect(() => {
    let keys = 0;
    let moves = 0;

    const keyHandler = () => keys++;
    const mouseHandler = () => moves++;

    window.addEventListener("keydown", keyHandler);
    window.addEventListener("mousemove", mouseHandler);

    const interval = setInterval(() => {
      if (keys > 50) {
        dispatch({
          type: "ADD_ALERT",
          payload: "⌨️ Abnormal typing speed detected",
        });
      }

      if (moves < 10) {
        dispatch({
          type: "ADD_ALERT",
          payload: "🖱️ Low mouse activity detected",
        });
      }

      keys = 0;
      moves = 0;
    }, 3000);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        dispatch({
          type: "ADD_ALERT",
          payload: "⚠️ Tab switch detected",
        });
      }
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("mousemove", mouseHandler);
    };
  }, [dispatch]);

  return null;
};

export default BehaviorTracker;