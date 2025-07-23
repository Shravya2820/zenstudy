export interface StudyItem {
  topic: string;
  duration: string;
}

export interface StudyPlan {
  subject: string;
  items: StudyItem[];
  breakTips: string[];
}
