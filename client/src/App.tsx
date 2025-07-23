import React, { useState } from "react";
import "./index.css";
import { getMockStudyPlan } from "./lib/openai";
import { StudyPlan } from "./types";
import Timer from "./components/Timer";

function App() {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const mockPlan = await getMockStudyPlan(prompt);
      setPlan(mockPlan);
    } catch (err) {
      setError("Failed to load study plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-center">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">ZenStudy</h1>
      <p className="text-gray-500 mb-6">Your AI-powered smart study planner ✨</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="What do you want to study today?"
        className="w-full max-w-xl mx-auto p-4 rounded shadow border resize-none mb-4"
        rows={3}
      />
      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded transition duration-200 mb-6"
      >
        {loading ? "Generating..." : "Generate Study Plan"}
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {plan && (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 text-left">
          <h2 className="text-2xl font-bold mb-4">📅 Today's Study Plan</h2>
          <ul className="space-y-2">
            {plan.topics.map((topic, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-lg">📘</span>
                <span>{topic.title} – {topic.duration}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <strong className="text-blue-700">AI Tip 💡</strong>
            <p>You're most focused in the morning. Schedule problem-solving sessions before noon!</p>
          </div>

          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded">
            <strong className="text-green-700">Smart Break</strong>
            <p>Try a 5-minute breathing exercise at 1:30 PM to recharge.</p>
          </div>

          <div className="mt-6">
            <Timer />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
