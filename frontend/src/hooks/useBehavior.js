import { useEffect, useState } from "react";

export const useBehavior = () => {
  const [behavior, setBehavior] = useState({
    typingSpeed: 0,
    mouseMoves: 0,
    tabSwitch: false,
  });

  useEffect(() => {
    let keys = 0;
    let moves = 0;

    const keyHandler = () => keys++;
    const mouseHandler = () => moves++;

    window.addEventListener("keydown", keyHandler);
    window.addEventListener("mousemove", mouseHandler);

    const interval = setInterval(() => {
      setBehavior({
        typingSpeed: keys,
        mouseMoves: moves,
        tabSwitch: document.hidden,
      });

      keys = 0;
      moves = 0;
    }, 3000);

    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("mousemove", mouseHandler);
      clearInterval(interval);
    };
  }, []);

  return behavior;
};