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
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <h1 className="text-5xl font-extrabold mb-4">ZenStudy</h1>
        <p className="text-xl mb-6">Your AI-powered smart study planner</p>
        <a href="#planner">
          <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition">
            Start Planning →
          </button>
        </a>
      </section>

      {/* Main Planner Section */}
      <main id="planner" className="max-w-3xl mx-auto py-16 px-4 space-y-10">
        {/* Static Plan */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-2">Today's Study Plan</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>📘 Revise Calculus - 10:00 AM</li>
            <li>🔬 Physics Quiz Practice - 11:30 AM</li>
            <li>📜 History Notes - 3:00 PM</li>
          </ul>
        </div>

        {/* AI Study Plan Generator */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Ask AI to Plan for You 🧠</h2>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            placeholder="e.g. Make a 2-hour plan for Math and History"
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

        {/* AI Output */}
        {response && (
          <div className="bg-indigo-100 border-l-4 border-indigo-400 p-5 rounded-xl whitespace-pre-wrap">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Your AI Study Plan:</h3>
            <p className="text-gray-900">{response}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 pb-6">
        Built with 💻 by Shravya N. Bhat · <a className="underline" href="https://github.com/Shravya2820" target="_blank">GitHub</a>
      </footer>
    </div>
  );
};

export default App;
