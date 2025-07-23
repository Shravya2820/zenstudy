import { StudyPlan } from "../types";

export async function getMockStudyPlan(prompt: string): Promise<StudyPlan> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        subject: prompt || "Sample Subject",
        topics: [
          { title: "Introduction", duration: "15 mins" },
          { title: "Core Concepts", duration: "30 mins" },
          { title: "Practice Problems", duration: "45 mins" },
        ],
        breaks: ["5-minute stretch break", "10-minute coffee break"],
      });
    }, 1000);
  });
}
