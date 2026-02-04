import { MIND_MAP_MOCK_DATA } from './learn-mind-map-mock.constant';
import type { LessonContent, QuestionType } from '../constants/mock-data.constant';

export const LESSON_CONTENTS_MOCK: Record<string, LessonContent> = {
  l4: {
    lessonId: 'l4',
    topics: [
      {
        id: 't1',
        title: 'Real Numbers',
        content: `Real numbers include rationals and irrationals. √2 is irrational.`,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: 'MCQ' as QuestionType,
        text: 'Which of the following is an irrational number?',
        options: ['1/2', '0.333...', '√2', '22/7'],
        correctAnswer: 2,
        explanation: '√2 is irrational (non-terminating, non-repeating decimal).',
      },
    ],
    flashcards: [],
    quickPrep: [],
  },

  l6: {
    lessonId: 'l6',
    topics: [
      {
        id: 't1',
        title: 'Triangle Congruency',
        content: `SSS, SAS, ASA, AAS and RHS are common congruency criteria.`,
        mindMap: MIND_MAP_MOCK_DATA,
      },
    ],
    quiz: [
      {
        id: 'q1',
        type: 'MCQ' as QuestionType,
        text: 'Which criterion proves two triangles congruent when two sides and the included angle are equal?',
        options: ['SSS', 'SAS', 'ASA', 'RHS'],
        correctAnswer: 1,
        explanation: 'SAS (Side-Angle-Side) is the correct criterion.',
      },
    ],
    flashcards: [],
    quickPrep: [],
  },

  // Minimal placeholders for other lessons
  l8: { lessonId: 'l8', topics: [{ id: 't1', title: 'Atoms & Molecules', content: 'Atomic structure overview.', mindMap: MIND_MAP_MOCK_DATA }], quiz: [], flashcards: [], quickPrep: [] },
  l9: { lessonId: 'l9', topics: [{ id: 't1', title: 'Cell Structure', content: 'Nucleus, mitochondria, ribosomes.', mindMap: MIND_MAP_MOCK_DATA }], quiz: [], flashcards: [], quickPrep: [] },
  l10: { lessonId: 'l10', topics: [{ id: 't1', title: 'Photosynthesis', content: 'Light and dark reactions.', mindMap: MIND_MAP_MOCK_DATA }], quiz: [], flashcards: [], quickPrep: [] },
  l11: { lessonId: 'l11', topics: [{ id: 't1', title: 'Literature', content: 'Summary and themes.', mindMap: MIND_MAP_MOCK_DATA }], quiz: [], flashcards: [], quickPrep: [] },
};
