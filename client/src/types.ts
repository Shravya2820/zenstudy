export type Topic = {
  title: string;
  duration: string;
};

export type StudyPlan = {
  subject: string;
  topics: Topic[];
  breaks: string[];
};