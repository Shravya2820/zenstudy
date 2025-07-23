import React, { useEffect, useState } from "react";
import { getMockStudyPlan } from "./lib/openai";
import { StudyPlan } from "./types";
import Timer from "./components/Timer";
import { auth, provider } from "./lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const mockPlan = await getMockStudyPlan(prompt);
      setPlan(mockPlan);
    } catch {
      setError("Failed to load study plan.");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      setError("Login failed.");
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <button onClick={login} className="px-6 py-3 text-white bg-blue-600 rounded text-lg shadow">
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          ZenStudy <span className="text-sm">📚</span>
        </h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
      </div>

      <textarea
        className="w-full p-3 rounded border mb-4"
        placeholder="e.g., I want to study DSA or revise Biology..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded"
      >
        {loading ? "Loading..." : "Generate Study Plan"}
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {plan && (
        <div className="mt-6 p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Subject: {plan.subject}</h2>
          <ul className="list-disc ml-5">
            {plan.items.map((item, index) => (
              <li key={index}>
                <span className="font-semibold">{item.topic}</span> – {item.duration}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="font-bold">Breaks:</h3>
            <ul className="list-disc ml-5">
              {plan.breakTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Timer />
    </div>
  );
};

export default App;
