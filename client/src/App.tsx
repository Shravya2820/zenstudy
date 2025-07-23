import React, { useState } from "react";
import "./index.css";
import { getMockStudyPlan } from "./lib/openai";

type StudyItem = {
  title: string;
  time: string;
};

function App() {
  const [plan, setPlan] = useState<StudyItem[]>([
    { title: "Revise Calculus", time: "10:00 AM" },
    { title: "Physics Quiz Practice", time: "11:30 AM" },
    { title: "History Notes", time: "3:00 PM" },
  ]);

  const aiTip = "You're most focused in the morning. Schedule problem-solving sessions before noon!";
  const breakSuggestion = "Try a 5-minute breathing exercise at 1:30 PM to recharge.";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-2">
        Zen<span className="text-black">Study</span>
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Your AI-powered smart study planner ✨
      </p>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Today's Study Plan</h2>
        <ul className="space-y-2">
          {plan.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>
                {index === 0 ? "🧠" : index === 1 ? "📚" : "📝"}
              </span>
              <span className="font-medium">{item.title}</span>
              <span className="text-sm text-gray-500 ml-auto">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-xl mx-auto bg-indigo-100 border-l-4 border-indigo-400 text-indigo-700 p-4 mb-4 rounded-md">
        <strong>AI Tip 💡</strong>
        <p>{aiTip}</p>
      </div>

      <div className="max-w-xl mx-auto bg-green-100 border-l-4 border-green-400 text-green-700 p-4 rounded-md">
        <strong>Smart Break</strong>
        <p>{breakSuggestion}</p>
      </div>
    </div>
  );
}

export default App;
