import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: string; // Format: "25m" or "1h"
}

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState<number>(parseDuration(duration));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  function parseDuration(input: string): number {
    const match = input.match(/(\d+)([mh])/i);
    if (!match) return 0;

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    return unit === "h" ? value * 3600 : value * 60;
  }

  return (
    <div className="flex items-center space-x-4 mt-4">
      <div className="text-lg font-mono">{formatTime(timeLeft)}</div>
      <button
        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        onClick={() => {
          setIsRunning(false);
          setTimeLeft(parseDuration(duration));
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;