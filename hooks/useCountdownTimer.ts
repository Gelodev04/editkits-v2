import { useState, useEffect } from 'react';

export function useCountdownTimer(initialTime = 0) {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return { timer, setTimer };
}
