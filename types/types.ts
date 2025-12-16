export enum ScreenName {
  LOGIN = "/login",
  SIGNUP = "/signup",
  FORGOT_PASSWORD = "/forgot-password",
  HOME = "/home",
  SUBJECTS = "/subjects",
  PROFILE = "/profile",
  CALENDAR = "/revision",
  ANALYTICS = "/analytics",
  LEADERBOARD = "/leaderboard",
  GOALS = "/goals",
  SETTINGS = '/settings'
}

// export enum ScreenName {
//  LOGIN = '/login',
//   SIGNUP = '/signup',
//   FORGOT_PASSWORD = '/forgot-password',
//   HOME = '/home',
//   SUBJECTS = '/subjects',
//   SUBJECT_DETAILS = '/subject/[subjectId]',
//   LESSONS = '/subject/[subjectId]/lessons',
//   LEARN = 'subject/[subjectId]/learn/[lessonId]',
//   REVISION = 'subject/[subjectId]/revision/[lessonId]',
//   REVISION_DETAILS = '/revision/[revisionId]',
//   MOCK_TEST = '/subject/[subjectId]/mock-test/[mockTestId]',
//   PROFILE = '/profile',
//   SETTINGS = '/settings',
//   GOALS = '/goals',
//   ANALYTICS = '/analytics',
//   CALENDAR = '/revision',
//   COMMUNITY = '/community',
//   LEADERBOARD = '/leaderboard',
// }

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  streakDays: number;
  totalPoints: number;
  goalsCompleted: number;
  rank?: number;
  // New fields
  age?: number;
  grade?: string;
  bio?: string;
  phone?: string;
}

export interface NotificationPreferences {
  studyReminders: boolean;
  examAlerts: boolean;
  newContent: boolean;
  communityUpdates: boolean;
  emailDigest: boolean;
}

export interface Subject {
  id: string;
  title: string;
  color: string;
  icon: string;
  progress: number; // 0-100
  totalLessons: number;
  description?: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  durationMinutes: number;
  isCompleted: boolean;
  lastAccessed?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline?: string;
}

export interface Topic {
  id: string;
  title: string;
  content: string; // Markdown/HTML string
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index
  explanation?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface QA {
  id: string;
  question: string;
  answerShort: string;
  answerMedium: string;
  answerLong: string;
}

export interface LessonContent {
  lessonId: string;
  topics: Topic[];
  quiz: Question[];
  flashcards: Flashcard[];
  quickPrep: QA[];
}

export interface ExamResult {
  id: string;
  date: string;
  subjectId: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
}

export interface PerformanceStats {
  averageScore: number;
  totalExams: number;
  totalStudyHours: number;
  masteryDistribution: { label: string; value: number; color: string }[];
  weeklyActivity: number[]; // 7 days of activity (e.g., hours or points)
  subjectTimeDistribution: {
    subjectName: string;
    hours: number;
    color: string;
  }[];
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  points: number;
  avatarUrl?: string;
  change: "up" | "down" | "same";
  location: string; // "City, Country"
}

export interface ScheduleItem {
  id: string;
  title: string;
  subjectId: string;
  date: string; // YYYY-MM-DD
  time: string;
  duration: number; // minutes
  type: "revision" | "test" | "lesson";
  status: "upcoming" | "completed" | "missed";
  description?: string;
}
