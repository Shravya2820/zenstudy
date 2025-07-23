import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="text-center mt-6">
      <h3 className="text-lg font-semibold mb-2">⏱️ Study Timer</h3>
      <p className="text-2xl font-mono mb-2">{formatTime(seconds)}</p>
      <button
        onClick={() => setRunning(!running)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
      >
        {running ? "Pause" : "Start"}
      </button>
      <button
        onClick={() => {
          setRunning(false);
          setSeconds(25 * 60);
        }}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default Timer;
