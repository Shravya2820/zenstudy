import { StudyPlan } from "../types";

export async function getMockStudyPlan(prompt: string): Promise<StudyPlan> {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("pde") || lowerPrompt.includes("partial differential equations")) {
    return {
      subject: "Partial Differential Equations",
      topics: [
        { title: "Classification of PDEs", duration: "30 min" },
        { title: "Method of Separation of Variables", duration: "45 min" },
        { title: "Fourier Series Applications", duration: "40 min" },
      ],
      breaks: ["Take a 10-minute stretch break after each topic!"],
    };
  }

  if (lowerPrompt.includes("dsa") || lowerPrompt.includes("data structures")) {
    return {
      subject: "Data Structures & Algorithms",
      topics: [
        { title: "Binary Trees", duration: "45 min" },
        { title: "Graphs & BFS/DFS", duration: "50 min" },
        { title: "Dynamic Programming", duration: "60 min" },
      ],
      breaks: ["Walk for 5 mins after Dynamic Programming session."],
    };
  }

  // Default response
  return {
    subject: "General Study Plan",
    topics: [
      { title: "Revise Calculus", duration: "30 min" },
      { title: "Physics Quiz Practice", duration: "45 min" },
      { title: "History Notes", duration: "40 min" },
    ],
    breaks: ["Try a 5-minute breathing exercise at 1:30 PM to recharge."],
  };
}
