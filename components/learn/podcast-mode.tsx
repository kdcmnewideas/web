
import { Lesson, Subject, Topic } from '@/types/types';
import { FastForward, Headphones, Mic2, Pause, Play, Rewind, User, Users, Volume2 } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface LearnPodcastModeProps {
  topic: Topic;
  subject?: Subject;
  lesson?: Lesson;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onCycleSpeed: () => void;
  numSpeakers: 1 | 2 | 3 | 4;
}

 const podcastMode = ({
  topic,
  subject,
  lesson,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onCycleSpeed,
  numSpeakers
}: LearnPodcastModeProps) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const sentenceRefs = useRef<(HTMLDivElement | null |undefined)[]>([]);

  // Split content into clean sentences
  const sentences = useMemo(() => {
    if (!topic?.content) return [];
    return topic.content
      .replace(/[#*]/g, '') 
      .split(/(?<=[.?!])\s+/)
      .filter(s => s.trim().length > 0);
  }, [topic?.content]);

  const getSynth = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      return window.speechSynthesis;
    }
    return null;
  }, []);

  useEffect(() => {
    const synth = getSynth();
    if (!synth) return;

    const updateVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) setIsVoiceReady(true);
    };

    updateVoices();
    synth.addEventListener('voiceschanged', updateVoices);
    return () => synth.removeEventListener('voiceschanged', updateVoices);
  }, [getSynth]);

  // Main Speech Controller
  useEffect(() => {
    const synth = getSynth();
    if (!synth || sentences.length === 0) return;

    if (isPlaying) {
      if (!synth.speaking) {
        const idx = currentSentenceIndex;
        if (idx >= sentences.length) {
          onTogglePlay();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(sentences[idx]);
        utterance.rate = playbackSpeed;
        
        const voices = synth.getVoices();
        const enVoices = voices.filter(v => v.lang.startsWith('en'));
        
        // Dynamic Voice Selection for up to 4 speakers
        if (enVoices.length > 0) {
            // Pick up to 4 distinct-ish voices
            const speakerVoices = [
                enVoices.find(v => v.name.includes('Premium') || v.name.includes('Google US')) || enVoices[0],
                enVoices.find(v => (v.name.includes('GB') || v.name.includes('UK')) && !v.name.includes('Premium')) || enVoices[1 % enVoices.length],
                enVoices.find(v => v.name.includes('Natural') || v.name.includes('Australia')) || enVoices[2 % enVoices.length],
                enVoices.find(v => v.name.includes('Neural') || v.name.includes('Ireland')) || enVoices[3 % enVoices.length]
            ];
            
            const speakerIdx = idx % numSpeakers;
            utterance.voice = speakerVoices[speakerIdx];
            
            // Adjust pitch slightly for each speaker to help distinction
            const pitches = [1.0, 1.1, 0.9, 1.05];
            utterance.pitch = pitches[speakerIdx];
        }

        utterance.onstart = () => setCurrentSentenceIndex(idx);
        utterance.onend = () => {
          if (idx < sentences.length - 1) {
            setCurrentSentenceIndex(idx + 1);
          } else {
            onTogglePlay();
          }
        };

        utterance.onerror = (e) => {
          if (e.error !== 'interrupted') onTogglePlay();
        };

        synth.speak(utterance);
      }
    } else {
      if (synth.speaking) synth.cancel();
    }
  }, [isPlaying, currentSentenceIndex, sentences, playbackSpeed, onTogglePlay, getSynth, numSpeakers]);

  useEffect(() => {
    const synth = getSynth();
    if (synth && isPlaying) synth.cancel();
  }, [playbackSpeed, getSynth]);

  useEffect(() => {
    return () => {
      const synth = getSynth();
      if (synth) synth.cancel();
    };
  }, [getSynth]);

  useEffect(() => {
    const activeEl = sentenceRefs.current[currentSentenceIndex];
    if (activeEl && transcriptRef.current) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentSentenceIndex]);

  const progress = sentences.length > 0 ? (currentSentenceIndex / Math.max(1, sentences.length - 1)) * 100 : 0;

  const handleSkip = (direction: 'prev' | 'next') => {
    const synth = getSynth();
    if (synth) synth.cancel();
    if (direction === 'prev') setCurrentSentenceIndex(prev => Math.max(0, prev - 1));
    else setCurrentSentenceIndex(prev => Math.min(sentences.length - 1, prev + 1));
  };

  const getSpeakerIcon = (idx: number) => {
    const icons = [Mic2, User, Users, Headphones];
    const Icon = icons[idx % numSpeakers];
    return <Icon className={`w-4 h-4 ${idx === currentSentenceIndex ? 'text-white' : 'text-indigo-600'}`} />;
  };

  return (
    <div className="animate-fade-in flex flex-col flex-grow w-full max-h-[700px]">
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${subject?.color || 'bg-indigo-600'} flex items-center justify-center text-white shadow-lg`}>
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 leading-tight truncate max-w-[180px]">{topic?.title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{subject?.title}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {numSpeakers === 1 ? 'Solo Podcast' : `${numSpeakers}-Host Panel`}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
           <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
           <span className="text-xs font-bold text-slate-700">{playbackSpeed}x</span>
        </div>
      </div>

      <div 
        ref={transcriptRef}
        className="flex-grow overflow-y-auto px-4 space-y-4 mb-8 scrollbar-hide"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' 
        }}
      >
        <div className="space-y-6 py-24">
          {sentences.map((sentence, idx) => {
            const isActive = idx === currentSentenceIndex;
            return (
              <div 
                key={idx}
                ref={el => sentenceRefs.current[idx] = el}
                onClick={() => {
                  const synth = getSynth();
                  if (synth) synth.cancel();
                  setCurrentSentenceIndex(idx);
                  if (!isPlaying) onTogglePlay();
                }}
                className={`
                  p-5 rounded-3xl transition-all duration-500 cursor-pointer relative group
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-xl scale-[1.03] z-10' 
                    : 'bg-white text-slate-400 opacity-40 hover:opacity-80'}
                `}
              >
                <div className="flex items-start gap-4">
                   <div className={`mt-1 p-1.5 rounded-xl ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-indigo-50'}`}>
                      {getSpeakerIcon(idx % numSpeakers)}
                   </div>
                   <p className="text-lg leading-relaxed font-semibold">
                     {sentence}
                   </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-50/50 backdrop-blur-md rounded-3xl p-6 border border-slate-200 shadow-xl mx-2">
        <div className="w-full space-y-5">
          <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-300 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={onCycleSpeed} className="text-[10px] font-black text-slate-500 hover:text-indigo-600 transition-colors bg-white px-3 py-2 rounded-xl border border-slate-200 tracking-tighter shadow-sm uppercase">{playbackSpeed}x Speed</button>
            <div className="flex items-center gap-6">
              <button onClick={() => handleSkip('prev')} className="text-slate-400 hover:text-indigo-600 transition-colors transform active:scale-90 p-2"><Rewind className="w-7 h-7" /></button>
              <button onClick={onTogglePlay} disabled={!isVoiceReady} className={`w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-wait`}>
                {!isVoiceReady ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : (isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />)}
              </button>
              <button onClick={() => handleSkip('next')} className="text-slate-400 hover:text-indigo-600 transition-colors transform active:scale-90 p-2"><FastForward className="w-7 h-7" /></button>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Lesson Progress</span>
              <span className="text-sm font-black text-slate-900 leading-none">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default podcastMode