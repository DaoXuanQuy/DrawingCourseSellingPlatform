import React, { useEffect, useState } from 'react';

interface Props {
  countdown: number;
  onFinsh?: () => void;
}

const Timer: React.FC<Props> = ({ countdown, onFinsh }) => {
  const [seconds, setSeconds] = useState(100);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    console.log(countdown);

    // setSeconds(countdown);
  }, [countdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setIsRunning(false);
          return prevSeconds;
        }
      });
    }, 1000);

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
      // Timer has reached 0, do something here
      if (onFinsh !== undefined) {
        onFinsh();
      }
    }
  }, [seconds]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return <div>{isRunning ? <div>{formatTime(seconds)}</div> : <div>00:00:00</div>}</div>;
};

export default Timer;
