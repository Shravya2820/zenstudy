import React, { useState, useEffect } from "react";

const Timer: React.FC = () => {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running) {
      interval = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="text-center mt-6">
      <h2 className="text-xl font-semibold">⏱️ Study Timer</h2>
      <p className="text-3xl font-mono my-2">{formatTime(time)}</p>
      <div className="space-x-4">
        <button onClick={() => setRunning(!running)} className="px-4 py-2 bg-blue-500 text-white rounded">
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => setTime(25 * 60)} className="px-4 py-2 bg-gray-300 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
