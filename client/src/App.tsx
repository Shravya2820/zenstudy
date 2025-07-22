import React, { useState } from "react";
import { getStudyPlan } from "./lib/openai";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const plan = await getStudyPlan(prompt);
    setResponse(plan);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-indigo-600">ZenStudy</h1>
        <p className="text-lg text-gray-600">
          Your AI-powered smart study planner ✨
        </p>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        {/* Static Plan Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-2">Today's Study Plan</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>🧠 Revise Calculus - 10:00 AM</li>
            <li>📚 Physics Quiz Practice - 11:30 AM</li>
            <li>📝 History Notes - 3:00 PM</li>
          </ul>
        </div>

        {/* AI Tip */}
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-5 rounded-xl mb-4">
          <h3 className="text-lg font-semibold text-indigo-700">AI Tip 💡</h3>
          <p className="text-gray-800">
            You're most focused in the morning. Schedule problem-solving sessions before noon!
          </p>
        </div>

        {/* Smart Break */}
        <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-xl mb-4">
          <h3 className="text-lg font-semibold text-green-700">Smart Break</h3>
          <p className="text-gray-800">Try a 5-minute breathing exercise at 1:30 PM to recharge.</p>
        </div>

        {/* AI Study Plan Generator */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Ask AI to Plan for You 🧠</h2>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            placeholder="e.g. Create a 2-hour plan for Physics and History"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </div>

        {/* AI Response */}
        {response && (
          <div className="bg-indigo-100 border-l-4 border-indigo-400 p-5 rounded-xl whitespace-pre-wrap">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Your AI Study Plan:</h3>
            <p className="text-gray-900">{response}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
