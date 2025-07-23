export async function getMockStudyPlan(prompt: string) {
  console.log("Mock prompt received:", prompt);
  return {
    subject: prompt || "General Study Plan",
    topics: [
      { title: "Introduction", duration: "15 mins" },
      { title: "Core Concepts", duration: "45 mins" },
      { title: "Practice Problems", duration: "30 mins" },
      { title: "Revision", duration: "20 mins" }
    ],
    breaks: ["5 min break after Core Concepts", "10 min break after Practice"]
  };
}
