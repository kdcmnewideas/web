import { Atom, BookOpen, Calculator, Dna, Hourglass } from 'lucide-angular';
import { MIND_MAP_MOCK_DATA } from '../mocks/learn-mind-map-mock.constant';
import { LESSON_CONTENTS_MOCK } from '../mocks/lesson-contents-mock.constant';

export enum QuestionType {
  MCQ = 'MCQ',
  WRITTEN = 'WRITTEN',
  ORAL = 'ORAL',
  FILL_BLANKS = 'FILL_BLANKS',
  TRUE_FALSE = 'TRUE_FALSE',
  MATCHING = 'MATCHING',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  streakDays: number;
  totalPoints: number;
  goalsCompleted: number;
  rank?: number;
  age?: number;
  grade?: string;
  bio?: string;
  phone?: string;
  role: 'user' | 'admin';
  location: string;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
}

export interface ClassLevel {
  id: string;
  name: string;
  boardId: string;
}

export interface Section {
  id: string;
  name: string;
  classId: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  mindMap?: MindMapNode;
}

export interface Subject {
  id: string;
  title: string;
  color: string;
  icon: any;
  progress: number;
  totalLessons: number;
  description?: string;
  boardId?: string;
  classId?: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  title: string;
  durationMinutes: number;
  isCompleted: boolean;
  lastAccessed?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Goal {
  id: number;
  user_id: string;
  target_type: string;
  target_id: string;
  target_score: number;
  current_score: number;
  deadline: string;
  is_active: boolean;
  is_achieved: boolean;
  created_at: string;
  updated_at: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: number | string | string[] | Record<string, string>;
  explanation?: string;
  pairs?: MatchingPair[];
  blankText?: string;
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
  weeklyActivity: number[];
  subjectTimeDistribution: { subjectName: string; hours: number; color: string }[];
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  points: number;
  avatarUrl?: string;
  change: 'up' | 'down' | 'same';
  location: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  subjectId: string;
  date: string;
  time: string;
  duration: number;
  type: 'revision' | 'test' | 'lesson';
  status: 'upcoming' | 'completed' | 'missed';
  description?: string;
}

export interface APIKeyData {
  id: string;
  name: string;
  key: string;
  provider: 'Gemini' | 'OpenAI' | 'Anthropic';
  usageTokens: number;
  limitTokens: number;
  costEstimate: number;
  status: 'Active' | 'Rate Limited' | 'Expired';
  lastChecked: string;
}

export const INITIAL_KEYS: APIKeyData[] = [
  {
    id: 'k1',
    name: 'Gemini Production',
    key: 'AIzaSyC...j9L3',
    provider: 'Gemini',
    usageTokens: 45200,
    limitTokens: 100000,
    costEstimate: 12.5,
    status: 'Active',
    lastChecked: '2 mins ago',
  },
  {
    id: 'k2',
    name: 'OpenAI Dev',
    key: 'sk-proj-...k2m1',
    provider: 'OpenAI',
    usageTokens: 82000,
    limitTokens: 80000,
    costEstimate: 45.2,
    status: 'Rate Limited',
    lastChecked: '15 mins ago',
  },
  {
    id: 'k3',
    name: 'Research Sandbox',
    key: 'AIzaSyA...z0X2',
    provider: 'Gemini',
    usageTokens: 1200,
    limitTokens: 50000,
    costEstimate: 0.45,
    status: 'Active',
    lastChecked: '1 hour ago',
  },
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Divya',
  email: 'divya@ailelearning.com',
  streakDays: 12,
  totalPoints: 1450,
  goalsCompleted: 8,
  avatarUrl: 'https://i.pravatar.cc/150?u=u3',
  rank: 42,
  age: 19,
  grade: 'User',
  bio: 'Architecting the future through rigorous study and persistent curiosity. I believe in the power of continuous learning.',
  phone: '+91-9123445567',
  role: 'user',
  location: 'Bangalore, India',
};

export const BOARDS: Board[] = [
  { id: 'b1', name: 'CBSE', description: 'Central Board of Secondary Education' },
  { id: 'b2', name: 'ICSE', description: 'Indian Certificate of Secondary Education' },
  { id: 'b3', name: 'IB', description: 'International Baccalaureate' },
];

export const CLASSES: ClassLevel[] = [
  { id: 'c1', name: 'Grade 10', boardId: 'b1' },
  { id: 'c2', name: 'Grade 11', boardId: 'b1' },
  { id: 'c3', name: 'Grade 12', boardId: 'b1' },
];

export const SECTIONS: Section[] = [
  { id: 'sec1', name: 'Section A', classId: 'c1' },
  { id: 'sec2', name: 'Section B', classId: 'c1' },
  { id: 'sec3', name: 'Science Stream', classId: 'c2' },
];

export const SUBJECTS: Subject[] = [
  {
    id: 's1',
    title: 'Mathematics',
    color: 'bg-indigo-600',
    icon: Calculator,
    progress: 75,
    totalLessons: 4,
    description:
      'Real Numbers, Polynomials, Triangles, and Quadrilaterals. Master algebraic and geometric concepts with proofs and applications.',
    boardId: 'b1',
    classId: 'c1',
  },
  {
    id: 's2',
    title: 'Science',
    color: 'bg-teal-500',
    icon: Atom,
    progress: 45,
    totalLessons: 8,
    description:
      'Motion, Atoms & Molecules, Cells, Plant Tissues, Photosynthesis, and Cell Division. Explore physics, chemistry, and biology fundamentals.',
    boardId: 'b1',
    classId: 'c2',
  },
  {
    id: 's3',
    title: 'English',
    color: 'bg-rose-500',
    icon: BookOpen,
    progress: 20,
    totalLessons: 4,
    description:
      'Literature texts, Tenses, Voice, and Parts of Speech. Develop language skills through diverse literary and grammatical studies.',
    boardId: 'b1',
    classId: 'c1',
  },
  {
    id: 's4',
    title: 'Social Studies',
    color: 'bg-amber-500',
    icon: Hourglass,
    progress: 90,
    totalLessons: 4,
    description:
      'Our Earth, French Revolution, Democracy, and Poverty. Understand geography, history, and social systems.',
    boardId: 'b1',
    classId: 'c1',
  },
];

export const RECENT_LESSONS: Lesson[] = [
  {
    id: 'l1',
    subjectId: 's1',
    title: 'The Chain Rule',
    durationMinutes: 45,
    isCompleted: false,
    lastAccessed: '2023-10-25T10:00:00Z',
    difficulty: 'Advanced',
  },
  {
    id: 'l2',
    subjectId: 's2',
    title: 'Motion: Equations of Motion',
    durationMinutes: 30,
    isCompleted: true,
    lastAccessed: '2023-10-24T14:30:00Z',
    difficulty: 'Intermediate',
  },
  {
    id: 'l3',
    subjectId: 's4',
    title: 'The French Revolution',
    durationMinutes: 50,
    isCompleted: false,
    lastAccessed: '2023-10-23T09:15:00Z',
    difficulty: 'Intermediate',
  },
];

export const ALL_LESSONS: Lesson[] = [
  ...RECENT_LESSONS,
  {
    id: 'l4',
    subjectId: 's1',
    title: 'Real Numbers',
    durationMinutes: 40,
    isCompleted: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'l5',
    subjectId: 's1',
    title: 'Polynomials and Factorisation',
    durationMinutes: 60,
    isCompleted: false,
    difficulty: 'Advanced',
  },
  {
    id: 'l6',
    subjectId: 's1',
    title: 'Triangles: Congruency',
    durationMinutes: 35,
    isCompleted: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'l7',
    subjectId: 's1',
    title: 'Quadrilaterals: Properties',
    durationMinutes: 40,
    isCompleted: false,
    difficulty: 'Intermediate',
  },
  {
    id: 'l8',
    subjectId: 's2',
    title: 'Atoms and Molecules',
    durationMinutes: 50,
    isCompleted: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'l9',
    subjectId: 's2',
    title: 'The Fundamental Unit of Life',
    durationMinutes: 45,
    isCompleted: false,
    difficulty: 'Advanced',
  },
  {
    id: 'l10',
    subjectId: 's2',
    title: 'Plant Tissues: Photosynthesis',
    durationMinutes: 55,
    isCompleted: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'l11',
    subjectId: 's3',
    title: 'The Fun They Had',
    durationMinutes: 40,
    isCompleted: false,
    difficulty: 'Beginner',
  },
  {
    id: 'l12',
    subjectId: 's3',
    title: 'Tenses: Present & Past Perfect',
    durationMinutes: 35,
    isCompleted: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'l13',
    subjectId: 's3',
    title: 'Voice: Active and Passive',
    durationMinutes: 38,
    isCompleted: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'l14',
    subjectId: 's3',
    title: 'Parts of Speech',
    durationMinutes: 45,
    isCompleted: false,
    difficulty: 'Beginner',
  },
  {
    id: 'l15',
    subjectId: 's4',
    title: 'Our Earth: Grid System',
    durationMinutes: 42,
    isCompleted: true,
    difficulty: 'Beginner',
  },
  {
    id: 'l16',
    subjectId: 's4',
    title: 'Democracy: Arguments',
    durationMinutes: 48,
    isCompleted: false,
    difficulty: 'Intermediate',
  },
  {
    id: 'l17',
    subjectId: 's4',
    title: 'Poverty as a Challenge',
    durationMinutes: 50,
    isCompleted: true,
    difficulty: 'Intermediate',
  },
  {
    id: 'l18',
    subjectId: 's2',
    title: 'Cell Structure and Division',
    durationMinutes: 55,
    isCompleted: false,
    difficulty: 'Advanced',
  },
  {
    id: 'l19',
    subjectId: 's2',
    title: 'Photosynthesis Process',
    durationMinutes: 50,
    isCompleted: true,
    difficulty: 'Intermediate',
  },
];

export const GOALS: Goal[] = [
  {
    id: 1,
    user_id: 'u1',
    target_type: 'Weekly Study Hours',
    target_id: 's1',
    target_score: 20,
    current_score: 14.5,
    deadline: '2023-10-31',
    is_active: true,
    is_achieved: false,
    created_at: '2023-10-01T08:00:00Z',
    updated_at: '2023-10-28T12:00:00Z',
  },
  {
    id: 2,
    user_id: 'u1',
    target_type: 'Lessons Completed',
    target_id: 'all',
    target_score: 10,
    current_score: 7,
    deadline: '2023-11-05',
    is_active: true,
    is_achieved: false,
    created_at: '2023-10-01T08:00:00Z',
    updated_at: '2023-10-28T12:00:00Z',
  },
  {
    id: 3,
    user_id: 'u1',
    target_type: 'Physics Mock Test',
    target_id: 's2',
    target_score: 90,
    current_score: 78,
    deadline: '2023-11-15',
    is_active: true,
    is_achieved: false,
    created_at: '2023-10-01T08:00:00Z',
    updated_at: '2023-10-28T12:00:00Z',
  },
];

export const LESSON_CONTENTS = LESSON_CONTENTS_MOCK;

export const EXAM_HISTORY: ExamResult[] = [
  {
    id: 'e1',
    date: '2023-10-28',
    subjectId: 's1',
    score: 92,
    totalQuestions: 20,
    timeSpentSeconds: 540,
  },
  {
    id: 'e2',
    date: '2023-10-27',
    subjectId: 's2',
    score: 78,
    totalQuestions: 15,
    timeSpentSeconds: 420,
  },
  {
    id: 'e3',
    date: '2023-10-25',
    subjectId: 's4',
    score: 85,
    totalQuestions: 25,
    timeSpentSeconds: 900,
  },
  {
    id: 'e4',
    date: '2023-10-22',
    subjectId: 's1',
    score: 88,
    totalQuestions: 20,
    timeSpentSeconds: 600,
  },
  {
    id: 'e5',
    date: '2023-10-20',
    subjectId: 's2',
    score: 65,
    totalQuestions: 15,
    timeSpentSeconds: 300,
  },
  {
    id: 'e6',
    date: '2023-10-18',
    subjectId: 's1',
    score: 75,
    totalQuestions: 20,
    timeSpentSeconds: 580,
  },
];

export const PERFORMANCE_STATS: PerformanceStats = {
  averageScore: 81,
  totalExams: 14,
  totalStudyHours: 32.5,
  masteryDistribution: [
    { label: 'Mastered', value: 35, color: 'text-emerald-500' },
    { label: 'Learning', value: 45, color: 'text-indigo-500' },
    { label: 'Beginner', value: 20, color: 'text-amber-500' },
  ],
  weeklyActivity: [45, 60, 30, 90, 120, 20, 45],
  subjectTimeDistribution: [
    { subjectName: 'Mathematics', hours: 12, color: 'bg-indigo-600' },
    { subjectName: 'Science', hours: 11.5, color: 'bg-teal-500' },
    { subjectName: 'Social Studies', hours: 5, color: 'bg-amber-500' },
    { subjectName: 'English', hours: 4, color: 'bg-rose-500' },
  ],
};

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    id: 'u2',
    rank: 1,
    name: 'Sarah Chen',
    points: 2450,
    change: 'same',
    location: 'New York, USA',
    avatarUrl: 'https://i.pravatar.cc/150?u=u2',
  },
  {
    id: 'u3',
    rank: 2,
    name: 'Michael Ross',
    points: 2320,
    change: 'up',
    location: 'London, UK',
    avatarUrl: 'https://i.pravatar.cc/150?u=u3',
  },
  {
    id: 'u4',
    rank: 3,
    name: 'Priya Patel',
    points: 2180,
    change: 'down',
    location: 'Mumbai, India',
    avatarUrl: 'https://i.pravatar.cc/150?u=u4',
  },
  {
    id: 'u5',
    rank: 4,
    name: 'David Kim',
    points: 1950,
    change: 'up',
    location: 'Seoul, SK',
    avatarUrl: 'https://i.pravatar.cc/150?u=u5',
  },
  {
    id: 'u6',
    rank: 5,
    name: 'Emma Wilson',
    points: 1890,
    change: 'same',
    location: 'Sydney, AU',
    avatarUrl: 'https://i.pravatar.cc/150?u=u6',
  },
  {
    id: 'u1',
    rank: 42,
    name: 'Alex Johnson',
    points: 1450,
    change: 'up',
    location: 'Toronto, CA',
    avatarUrl: 'https://i.pravatar.cc/150?u=u1',
  },
  {
    id: 'u7',
    rank: 43,
    name: 'Lucas Silva',
    points: 1445,
    change: 'down',
    location: 'Rio, BR',
    avatarUrl: 'https://i.pravatar.cc/150?u=u7',
  },
];

export const REVISION_TOPICS = [
  { id: 'rt1', title: 'Photosynthesis', subject: 'Science', date: '2 days ago' },
  { id: 'rt2', title: 'Quadratic Equations', subject: 'Mathematics', date: '4 days ago' },
  { id: 'rt3', title: 'The French Revolution', subject: 'Social Studies', date: '5 days ago' },
  { id: 'rt4', title: 'Verb Conjugation', subject: 'English', date: '1 week ago' },
  { id: 'rt5', title: 'Cell Division', subject: 'Science', date: '1 week ago' },
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 'sch1',
    title: 'Real Numbers Review',
    subjectId: 's1',
    date: '2023-10-28',
    time: '09:00 AM',
    duration: 45,
    type: 'revision',
    status: 'completed',
  },
  {
    id: 'sch2',
    title: 'Motion Quiz',
    subjectId: 's2',
    date: '2023-10-27',
    time: '02:00 PM',
    duration: 30,
    type: 'test',
    status: 'completed',
  },
  {
    id: 'sch3',
    title: 'The French Revolution',
    subjectId: 's4',
    date: '2023-11-01',
    time: '10:00 AM',
    duration: 60,
    type: 'lesson',
    status: 'upcoming',
    description: 'Read chapter 4 and complete the summary.',
  },
  {
    id: 'sch4',
    title: 'Tenses Practice',
    subjectId: 's3',
    date: '2023-11-01',
    time: '01:30 PM',
    duration: 30,
    type: 'revision',
    status: 'upcoming',
  },
  {
    id: 'sch5',
    title: 'Cell Division Mock Test',
    subjectId: 's2',
    date: '2023-11-02',
    time: '11:00 AM',
    duration: 45,
    type: 'test',
    status: 'upcoming',
  },
  {
    id: 'sch6',
    title: 'Polynomials Workshop',
    subjectId: 's1',
    date: '2023-11-03',
    time: '04:00 PM',
    duration: 90,
    type: 'lesson',
    status: 'upcoming',
  },
  {
    id: 'sch7',
    title: 'Photosynthesis Revision',
    subjectId: 's2',
    date: '2023-11-04',
    time: '10:00 AM',
    duration: 60,
    type: 'revision',
    status: 'upcoming',
  },
];
