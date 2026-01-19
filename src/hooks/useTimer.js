import { useState, useEffect, useRef } from "react";

export function useTimer({ allowedTime, onFinish }) {
  const [time, setTime] = useState(allowedTime);
  const timerIdRef = useRef(null);

  // Update time when allowedTime changes (difficulty change)
  useEffect(() => {
    setTime(allowedTime);
  }, [allowedTime]);

  const startTimer = () => {
    if (timerIdRef.current) return; // Prevent multiple timers

    timerIdRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerIdRef.current);
          timerIdRef.current = null;
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setTime(allowedTime);
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, []);

  return { timeLeft: time, startTimer, resetTimer };
}
