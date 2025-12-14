
import { User, Subject, Lesson, Goal, LessonContent, ExamResult, LeaderboardEntry, PerformanceStats, ScheduleItem } from './types/types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@studymate.com',
  streakDays: 12,
  totalPoints: 1450,
  goalsCompleted: 8,
  avatarUrl: 'https://i.pravatar.cc/150?u=u1',
  rank: 42,
  age: 19,
  grade: 'Undergraduate (Year 2)',
  bio: 'Aspiring Physicist aiming to master Calculus and Mechanics. Love solving problems!',
  phone: '+1 (555) 123-4567'
};

export const SUBJECTS: Subject[] = [
  {
    id: 's1',
    title: 'Mathematics',
    color: 'bg-indigo-600',
    icon: 'Calculator',
    progress: 75,
    totalLessons: 24,
    description: 'Master calculus, algebra, and geometry with interactive problem solving.'
  },
  {
    id: 's2',
    title: 'Physics',
    color: 'bg-teal-500',
    icon: 'Atom',
    progress: 45,
    totalLessons: 18,
    description: 'Explore the fundamental laws of the universe from mechanics to quantum physics.'
  },
  {
    id: 's3',
    title: 'Literature',
    color: 'bg-rose-500',
    icon: 'BookOpen',
    progress: 20,
    totalLessons: 12
  },
  {
    id: 's4',
    title: 'History',
    color: 'bg-amber-500',
    icon: 'Hourglass',
    progress: 90,
    totalLessons: 15
  },
  {
    id: 's5',
    title: 'Biology',
    color: 'bg-emerald-500',
    icon: 'Dna',
    progress: 10,
    totalLessons: 20
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
    id: 'g1',
    title: 'Weekly Study Hours',
    target: 20,
    current: 14.5,
    unit: 'hrs',
    deadline: '2023-10-31'
  },
  {
    id: 'g2',
    title: 'Lessons Completed',
    target: 10,
    current: 7,
    unit: 'lessons',
    deadline: '2023-11-05'
  },
  {
    id: 'g3',
    title: 'Physics Mock Test',
    target: 90,
    current: 78,
    unit: '%',
    deadline: '2023-11-15'
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
        `
      },
      {
        id: 't2',
        title: 'Implicit Differentiation',
        content: `
### Implicit Differentiation

In calculus, a method called **implicit differentiation** makes use of the chain rule to differentiate implicitly defined functions.

To differentiate an implicit function $y(x)$, defined by an equation $R(x,y) = 0$, it is not generally possible to solve it explicitly for $y$ and then differentiate. Instead, one can totally differentiate $R(x,y) = 0$ with respect to $x$ and then solve the resulting linear equation for $dy/dx$.
        `
      }
    ],
    quiz: [
      {
        id: 'q1',
        text: 'What is the derivative of sin(x²)?',
        options: ['cos(x²)', '2x cos(x²)', '-sin(x²)', '2x sin(x)'],
        correctAnswer: 1,
        explanation: 'Using the chain rule: d/dx(sin(u)) = cos(u) * du/dx. Here u = x², so du/dx = 2x.'
      },
      {
        id: 'q2',
        text: 'If y = u³ and u = x + 1, what is dy/dx?',
        options: ['3(x+1)²', '3x²', '3u', 'x+1'],
        correctAnswer: 0,
        explanation: 'dy/du = 3u², du/dx = 1. Product is 3u² * 1 = 3(x+1)².'
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
  weeklyActivity: [45, 60, 30, 90, 120, 20, 45], // Minutes per day
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
  // ... gap ...
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
  // Past
  { id: 'sch1', title: 'Calculus Review', subjectId: 's1', date: '2023-10-28', time: '09:00 AM', duration: 45, type: 'revision', status: 'completed' },
  { id: 'sch2', title: 'Physics Quiz', subjectId: 's2', date: '2023-10-27', time: '02:00 PM', duration: 30, type: 'test', status: 'completed' },
  
  // Today/Upcoming
  { id: 'sch3', title: 'The Industrial Revolution', subjectId: 's4', date: '2023-11-01', time: '10:00 AM', duration: 60, type: 'lesson', status: 'upcoming', description: 'Read chapter 4 and complete the summary.' },
  { id: 'sch4', title: 'Verbs Practice', subjectId: 's3', date: '2023-11-01', time: '01:30 PM', duration: 30, type: 'revision', status: 'upcoming' },
  
  // Future
  { id: 'sch5', title: 'Cell Biology Mock Test', subjectId: 's5', date: '2023-11-02', time: '11:00 AM', duration: 45, type: 'test', status: 'upcoming' },
  { id: 'sch6', title: 'Integrals Workshop', subjectId: 's1', date: '2023-11-03', time: '04:00 PM', duration: 90, type: 'lesson', status: 'upcoming' },
  { id: 'sch7', title: 'Mechanics Revision', subjectId: 's2', date: '2023-11-04', time: '10:00 AM', duration: 60, type: 'revision', status: 'upcoming' },
];
