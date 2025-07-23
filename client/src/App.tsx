import React, { useState } from "react";
import { getMockStudyPlan } from "./lib/openai";
import "./index.css";

type Topic = {
  title: string;
  duration: string;
};

type StudyPlan = {
  subject: string;
  topics: Topic[];
  breaks: string[];
};

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
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
          ZenStudy 📚
        </h1>
        <textarea
          className="w-full p-3 border rounded mb-4 resize-none shadow-sm"
          rows={4}
          placeholder="Enter your subject or study goals..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mb-4"
        >
          {loading ? "Generating..." : "Generate Study Plan"}
        </button>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {plan && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              Subject: {plan.subject}
            </h2>
            <ul className="mb-4">
              {plan.topics.map((topic, index) => (
                <li key={index} className="mb-1">
                  ✅ <strong>{topic.title}</strong> – {topic.duration}
                </li>
              ))}
            </ul>
            <div>
              <h3 className="font-semibold mb-1">Breaks:</h3>
              <ul className="list-disc list-inside">
                {plan.breaks.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
