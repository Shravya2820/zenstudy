import { useState } from "react";
import { getStudyPlan } from "./lib/openai";

function App() {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const prompt = "Generate a study plan for a Computer Science student preparing for exams with 3 subjects: Math, Physics, History.";
    const result = await getStudyPlan(prompt);
    setPlan(result || "No plan generated.");
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">ZenStudy AI</h1>

      <button
        onClick={handleGenerate}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate AI Study Plan"}
      </button>

      {plan && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow whitespace-pre-line">
          {plan}
        </div>
      )}
    </div>
  );
}

export default App;