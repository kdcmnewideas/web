
import { Question, QuestionType } from '@/types/types';
import React from 'react';

// Specialized Renderers
import { FillBlanksRenderer } from './renderers/fill-blanks-renderer';
import { MatchingRenderer } from './renderers/matching-renderer';
import { MCQRenderer } from './renderers/mcq-renderer';
import { OralRenderer } from './renderers/oral-renderer';
import { WrittenRenderer } from './renderers/written-renderer';

interface QuestionRendererProps {
  question: Question;
  answer: any;
  setAnswer: (val: any) => void;
  isRecording: boolean;
  setIsRecording: (val: boolean) => void;
  recordingTime: number;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  answer,
  setAnswer,
  isRecording,
  setIsRecording,
  recordingTime
}) => {
  switch (question.type) {
    case QuestionType.MCQ:
    case QuestionType.TRUE_FALSE:
      return (
        <MCQRenderer 
          options={question.options} 
          answer={answer} 
          setAnswer={setAnswer} 
        />
      );

    case QuestionType.WRITTEN:
      return (
        <WrittenRenderer 
          answer={answer} 
          setAnswer={setAnswer} 
        />
      );

    case QuestionType.ORAL:
      return (
        <OralRenderer 
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          recordingTime={recordingTime}
          answer={answer}
          setAnswer={setAnswer}
        />
      );

    case QuestionType.FILL_BLANKS:
      return (
        <FillBlanksRenderer 
          blankText={question.blankText || ''} 
          answer={answer} 
          setAnswer={setAnswer} 
        />
      );

    case QuestionType.MATCHING:
      return (
        <MatchingRenderer 
          pairs={question.pairs || []} 
          answer={answer} 
          setAnswer={setAnswer} 
        />
      );

    default:
      return <div className="p-8 text-center text-slate-500">Unsupported question type.</div>;
  }
};
