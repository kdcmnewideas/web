
import { Topic } from '@/types/types';
import { Sparkles, Volume2 } from 'lucide-react-native';
import React from 'react';

interface LearnReadModeProps {
  topic: Topic;
  onReadAloud: () => void;
}

export const ReadMode = ({ topic, onReadAloud }: LearnReadModeProps) => {
  return (
    <div className="animate-fade-in flex flex-col grow">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{topic?.title}</h1>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={onReadAloud}
            className="flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-700 font-medium transition-colors"
          >
            <Volume2 className="w-4 h-4 mr-2" /> Read Aloud
          </button>
          <button className="flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-700 font-medium transition-colors">
            <Sparkles className="w-4 h-4 mr-2 text-purple-500" /> Regenerate with AI
          </button>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none grow text-slate-600 leading-relaxed">
        {topic?.content.split('\n').map((line, i) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('###')) return <h3 key={i} className="text-xl font-bold mt-8 mb-3 text-slate-800">{trimmed.replace('###', '')}</h3>;
          if (trimmed.startsWith('**')) return <p key={i} className="my-4 font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg border-l-4 border-indigo-600">{trimmed.replace(/\*\*/g, '')}</p>;
          if (trimmed === '') return <div key={i} className="h-2"></div>;
          
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={i} className="mb-4">
              {parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={j} className="text-slate-900">{part.replace(/\*\*/g, '')}</strong>;
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    </div>
  );
};
