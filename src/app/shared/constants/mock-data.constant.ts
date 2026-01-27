export enum QuestionType {
  MCQ = 'MCQ',
  WRITTEN = 'WRITTEN',
  ORAL = 'ORAL',
  FILL_BLANKS = 'FILL_BLANKS',
  TRUE_FALSE = 'TRUE_FALSE',
  MATCHING = 'MATCHING'
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
  icon: string;
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


export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'admin@studymate.com',
  streakDays: 12,
  totalPoints: 1450,
  goalsCompleted: 8,
  avatarUrl: 'https://i.pravatar.cc/150?u=u1',
  rank: 42,
  age: 19,
  grade: 'Administrator',
  bio: 'Platform Administrator for StudyMate.',
  phone: '+1 (555) 123-4567',
  role: 'admin'
};

export const BOARDS: Board[] = [
  { id: 'b1', name: 'CBSE', description: 'Central Board of Secondary Education' },
  { id: 'b2', name: 'ICSE', description: 'Indian Certificate of Secondary Education' },
  { id: 'b3', name: 'IB', description: 'International Baccalaureate' }
];

export const CLASSES: ClassLevel[] = [
  { id: 'c1', name: 'Grade 10', boardId: 'b1' },
  { id: 'c2', name: 'Grade 11', boardId: 'b1' },
  { id: 'c3', name: 'Grade 12', boardId: 'b1' }
];

export const SECTIONS: Section[] = [
  { id: 'sec1', name: 'Section A', classId: 'c1' },
  { id: 'sec2', name: 'Section B', classId: 'c1' },
  { id: 'sec3', name: 'Science Stream', classId: 'c2' }
];

export const SUBJECTS: Subject[] = [
  {
    id: 's1',
    title: 'Mathematics',
    color: 'bg-indigo-600',
    icon: 'lucideCalculator',
    progress: 75,
    totalLessons: 24,
    description: 'Master calculus, algebra, and geometry with interactive problem solving.',
    boardId: 'b1',
    classId: 'c1'
  },
  {
    id: 's2',
    title: 'Physics',
    color: 'bg-teal-500',
    icon: 'lucideAtom',
    progress: 45,
    totalLessons: 18,
    description: 'Explore the fundamental laws of the universe from mechanics to quantum physics.',
    boardId: 'b1',
    classId: 'c2'
  },
  {
    id: 's3',
    title: 'Literature',
    color: 'bg-rose-500',
    icon: 'lucideBookOpen',
    progress: 20,
    totalLessons: 12,
    boardId: 'b1',
    classId: 'c1'
  },
  {
    id: 's4',
    title: 'History',
    color: 'bg-amber-500',
    icon: 'lucideHourglass',
    progress: 90,
    totalLessons: 15,
    boardId: 'b1',
    classId: 'c1'
  },
  {
    id: 's5',
    title: 'Biology',
    color: 'bg-emerald-500',
    icon: 'lucideDna',
    progress: 10,
    totalLessons: 20,
    boardId: 'b1',
    classId: 'c1'
  }
];

export const RECENT_LESSONS: Lesson[] = [
  {
    id: 'l1',
    subjectId: 's1',
    title: 'Calculus: Derivatives II',
    durationMinutes: 45,
    isCompleted: false,
    lastAccessed: '2023-10-25T10:00:00Z',
    difficulty: 'Advanced'
  },
  {
    id: 'l2',
    subjectId: 's2',
    title: 'Newtonian Mechanics',
    durationMinutes: 30,
    isCompleted: true,
    lastAccessed: '2023-10-24T14:30:00Z',
    difficulty: 'Intermediate'
  },
  {
    id: 'l3',
    subjectId: 's4',
    title: 'The Industrial Revolution',
    durationMinutes: 50,
    isCompleted: false,
    lastAccessed: '2023-10-23T09:15:00Z',
    difficulty: 'Intermediate'
  }
];

export const ALL_LESSONS: Lesson[] = [
  ...RECENT_LESSONS,
  {
    id: 'l4',
    subjectId: 's1',
    title: 'Limits and Continuity',
    durationMinutes: 40,
    isCompleted: true,
    difficulty: 'Intermediate'
  },
  {
    id: 'l5',
    subjectId: 's1',
    title: 'Integrals Introduction',
    durationMinutes: 60,
    isCompleted: false,
    difficulty: 'Advanced'
  },
  {
    id: 'l6',
    subjectId: 's1',
    title: 'Functions and Graphs',
    durationMinutes: 30,
    isCompleted: true,
    difficulty: 'Beginner'
  }
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
    updated_at: '2023-10-28T12:00:00Z'
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
    updated_at: '2023-10-28T12:00:00Z'
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
    updated_at: '2023-10-28T12:00:00Z'
  }
];

export const LESSON_CONTENTS: Record<string, LessonContent> = {
  'l1': {
    lessonId: 'l1',
    topics: [
      {
        id: 't1',
        title: 'The Chain Rule',
        content: `
### Understanding the Chain Rule

The chain rule is a formula to compute the derivative of a composite function. That is, if $f$ and $g$ are differentiable functions, then the chain rule expresses the derivative of their composition $f \\circ g$.

**Formula:**
If $y = f(u)$ and $u = g(x)$, then:
$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$

**Example:**
Find the derivative of $y = (3x^2 + 1)^2$.
1. Let $u = 3x^2 + 1$, so $y = u^2$.
2. $\\frac{dy}{du} = 2u$
3. $\\frac{du}{dx} = 6x$
4. Multiply: $2u \\cdot 6x = 12x(3x^2 + 1)$
        `,
        mindMap: {
          id: 'root',
          label: 'The Chain Rule',
          children: [
            { id: 'c1', label: 'Composite Functions' },
            { id: 'c2', label: 'Differentiation Formula', children: [{ id: 'c2-1', label: 'dy/dx = dy/du * du/dx' }] },
            { id: 'c3', label: 'Practical Examples', children: [{ id: 'c3-1', label: 'Polynomials' }, { id: 'c3-2', label: 'Trigonometric' }] },
            { id: 'c4', label: 'Applications' }
          ]
        }
      },
      {
        id: 't2',
        title: 'Implicit Differentiation',
        content: `
### Implicit Differentiation

In calculus, a method called **implicit differentiation** makes use of the chain rule to differentiate implicitly defined functions.

To differentiate an implicit function $y(x)$, defined by an equation $R(x,y) = 0$, it is not generally possible to solve it explicitly for $y$ and then differentiate. Instead, one can totally differentiate $R(x,y) = 0$ with respect to $x$ and then solve the resulting linear equation for $dy/dx$.
        `,
        mindMap: {
          id: 'root',
          label: 'Implicit Differentiation',
          children: [
            { id: 'i1', label: 'Implicit Functions' },
            { id: 'i2', label: 'Chain Rule Application' },
            { id: 'i3', label: 'Algebraic Solving', children: [{ id: 'i3-1', label: 'Isolating dy/dx' }] },
            { id: 'i4', label: 'Tangent Lines' }
          ]
        }
      }
    ],
    quiz: [
      {
        id: 'q1',
        type: QuestionType.MCQ,
        text: 'What is the derivative of sin(x²)?',
        options: ['cos(x²)', '2x cos(x²)', '-sin(x²)', '2x sin(x)'],
        correctAnswer: 1,
        explanation: 'Using the chain rule: d/dx(sin(u)) = cos(u) * du/dx. Here u = x², so du/dx = 2x.'
      },
      {
        id: 'q2',
        type: QuestionType.TRUE_FALSE,
        text: 'The derivative of a constant is always zero.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'A constant function represents a horizontal line, so its rate of change (slope) is always zero.'
      },
      {
        id: 'q3',
        type: QuestionType.WRITTEN,
        text: 'Explain the importance of the Chain Rule in complex differentiation.',
        explanation: 'The Chain Rule allows us to break down complex composite functions into simpler ones for step-by-step differentiation.'
      },
      {
        id: 'q4',
        type: QuestionType.ORAL,
        text: 'Briefly explain the concept of a "derivative" as if you were talking to a high schooler.',
        explanation: 'A derivative is simply the instantaneous rate of change or the slope of a curve at any specific point.'
      },
      {
        id: 'q5',
        type: QuestionType.FILL_BLANKS,
        text: 'Complete the power rule formula.',
        blankText: 'The derivative of x^n is [blank] * x^([blank]).',
        correctAnswer: ['n', 'n-1'],
        explanation: 'The power rule states: d/dx(x^n) = n*x^(n-1).'
      },
      {
        id: 'q6',
        type: QuestionType.MATCHING,
        text: 'Match the function with its derivative.',
        pairs: [
          { id: 'p1', left: 'sin(x)', right: 'cos(x)' },
          { id: 'p2', left: 'ln(x)', right: '1/x' },
          { id: 'p3', left: 'e^x', right: 'e^x' },
          { id: 'p4', left: 'tan(x)', right: 'sec²(x)' }
        ],
        explanation: 'These are fundamental derivatives that must be memorized.'
      }
    ],
    flashcards: [
      { id: 'f1', front: 'Chain Rule Formula', back: "d/dx[f(g(x))] = f'(g(x)) * g'(x)" },
      { id: 'f2', front: 'Derivative of e^x', back: 'e^x' },
      { id: 'f3', front: 'Derivative of ln(x)', back: '1/x' },
      { id: 'f4', front: 'Power Rule', back: "d/dx(x^n) = n*x^(n-1)" },
      { id: 'f5', front: 'Product Rule', back: "d/dx(uv) = u'v + uv'" }
    ],
    quickPrep: [
      {
        id: 'qa1',
        question: 'Define the Product Rule.',
        answerShort: "The product rule finds derivatives of products: (fg)' = f'g + fg'.",
        answerMedium: "The product rule is a calculus formula used to find the derivatives of products of two or more functions. For two functions f and g, it is expressed as: (fg)' = f'g + fg'.",
        answerLong: "The product rule is a fundamental formula in calculus used to find the derivatives of products of two or more functions. It states that for two differentiable functions f(x) and g(x), the derivative of their product is the first function times the derivative of the second, plus the second function times the derivative of the first. The formula is written as: d/dx[f(x)g(x)] = f(x)g'(x) + g(x)f'(x)."
      },
      {
        id: 'qa2',
        question: 'Explain the Chain Rule.',
        answerShort: "Chain rule differentiates composite functions: d/dx[f(g(x))] = f'(g(x)) * g'(x).",
        answerMedium: "The chain rule is used to compute the derivative of a composite function. If y = f(u) and u = g(x), then dy/dx = (dy/du) * (du/dx).",
        answerLong: "The chain rule is a rule for computing the derivative of the composition of two or more functions. In intuitive terms, if a variable z depends on y, and y depends on x, then z depends on x as well, via the intermediate variable y. The chain rule states that the instantaneous rate of change of z with respect to x is the product of the instantaneous rate of change of z with respect to y and the instantaneous rate of change of y with respect to x."
      },
       {
        id: 'qa3',
        question: 'What is implicit differentiation?',
        answerShort: "Differentiating both sides of an equation with respect to x and solving for dy/dx.",
        answerMedium: "Implicit differentiation is a technique used when y cannot be easily isolated on one side of the equation. You differentiate both sides with respect to x, treating y as a function of x (using the chain rule), and then solve for dy/dx.",
        answerLong: "Implicit differentiation is a method in calculus for finding the derivative of a function that is not defined explicitly (y = ...). Instead, the relationship between x and y is given by an implicit equation like R(x, y) = 0. To find dy/dx, you differentiate every term of the equation with respect to x. When differentiating terms involving y, you must apply the Chain Rule, multiplying by dy/dx. Finally, you rearrange the resulting equation to solve algebraically for dy/dx."
      }
    ]
  }
};

export const EXAM_HISTORY: ExamResult[] = [
  { id: 'e1', date: '2023-10-28', subjectId: 's1', score: 92, totalQuestions: 20, timeSpentSeconds: 540 },
  { id: 'e2', date: '2023-10-27', subjectId: 's2', score: 78, totalQuestions: 15, timeSpentSeconds: 420 },
  { id: 'e3', date: '2023-10-25', subjectId: 's4', score: 85, totalQuestions: 25, timeSpentSeconds: 900 },
  { id: 'e4', date: '2023-10-22', subjectId: 's1', score: 88, totalQuestions: 20, timeSpentSeconds: 600 },
  { id: 'e5', date: '2023-10-20', subjectId: 's5', score: 65, totalQuestions: 15, timeSpentSeconds: 300 },
  { id: 'e6', date: '2023-10-18', subjectId: 's1', score: 75, totalQuestions: 20, timeSpentSeconds: 580 },
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
    { subjectName: 'Physics', hours: 8.5, color: 'bg-teal-500' },
    { subjectName: 'History', hours: 5, color: 'bg-amber-500' },
    { subjectName: 'Literature', hours: 4, color: 'bg-rose-500' },
    { subjectName: 'Biology', hours: 3, color: 'bg-emerald-500' },
  ]
};

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { id: 'u2', rank: 1, name: 'Sarah Chen', points: 2450, change: 'same', location: 'New York, USA', avatarUrl: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', rank: 2, name: 'Michael Ross', points: 2320, change: 'up', location: 'London, UK', avatarUrl: 'https://i.pravatar.cc/150?u=u3' },
  { id: 'u4', rank: 3, name: 'Priya Patel', points: 2180, change: 'down', location: 'Mumbai, India', avatarUrl: 'https://i.pravatar.cc/150?u=u4' },
  { id: 'u5', rank: 4, name: 'David Kim', points: 1950, change: 'up', location: 'Seoul, SK', avatarUrl: 'https://i.pravatar.cc/150?u=u5' },
  { id: 'u6', rank: 5, name: 'Emma Wilson', points: 1890, change: 'same', location: 'Sydney, AU', avatarUrl: 'https://i.pravatar.cc/150?u=u6' },
  { id: 'u1', rank: 42, name: 'Alex Johnson', points: 1450, change: 'up', location: 'Toronto, CA', avatarUrl: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u7', rank: 43, name: 'Lucas Silva', points: 1445, change: 'down', location: 'Rio, BR', avatarUrl: 'https://i.pravatar.cc/150?u=u7' },
];

export const REVISION_TOPICS = [
  { id: 'rt1', title: 'Photosynthesis', subject: 'Biology', date: '2 days ago' },
  { id: 'rt2', title: 'Quadratic Equations', subject: 'Mathematics', date: '4 days ago' },
  { id: 'rt3', title: 'World War II', subject: 'History', date: '5 days ago' },
  { id: 'rt4', title: 'Verb Conjugation', subject: 'Literature', date: '1 week ago' },
  { id: 'rt5', title: 'Cell Division', subject: 'Biology', date: '1 week ago' }
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  { id: 'sch1', title: 'Calculus Review', subjectId: 's1', date: '2023-10-28', time: '09:00 AM', duration: 45, type: 'revision', status: 'completed' },
  { id: 'sch2', title: 'Physics Quiz', subjectId: 's2', date: '2023-10-27', time: '02:00 PM', duration: 30, type: 'test', status: 'completed' },
  { id: 'sch3', title: 'The Industrial Revolution', subjectId: 's4', date: '2023-11-01', time: '10:00 AM', duration: 60, type: 'lesson', status: 'upcoming', description: 'Read chapter 4 and complete the summary.' },
  { id: 'sch4', title: 'Verbs Practice', subjectId: 's3', date: '2023-11-01', time: '01:30 PM', duration: 30, type: 'revision', status: 'upcoming' },
  { id: 'sch5', title: 'Cell Biology Mock Test', subjectId: 's5', date: '2023-11-02', time: '11:00 AM', duration: 45, type: 'test', status: 'upcoming' },
  { id: 'sch6', title: 'Integrals Workshop', subjectId: 's1', date: '2023-11-03', time: '04:00 PM', duration: 90, type: 'lesson', status: 'upcoming' },
  { id: 'sch7', title: 'Mechanics Revision', subjectId: 's2', date: '2023-11-04', time: '10:00 AM', duration: 60, type: 'revision', status: 'upcoming' },
];
