import { StudyPlan } from "./types";

export async function getMockStudyPlan(prompt: string): Promise<StudyPlan> {
  return {
    subject: "Data Structures & Algorithms",
    items: [
      { topic: "Binary Trees", duration: "45 min" },
      { topic: "Graphs & BFS/DFS", duration: "50 min" },
      { topic: "Dynamic Programming", duration: "60 min" },
    ],
    breakTips: ["Walk for 5 mins after Dynamic Programming session."],
  };
}
