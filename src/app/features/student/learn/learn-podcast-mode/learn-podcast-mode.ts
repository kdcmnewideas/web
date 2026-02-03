import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Lesson, Subject, Topic } from '../../../../shared/constants/mock-data.constant';
import {
  FastForward,
  Headphones,
  LucideAngularModule,
  Mic,
  Pause,
  Play,
  Rewind,
  User,
  Users,
  Volume2,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learn-podcast-mode',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './learn-podcast-mode.html',
  styleUrl: './learn-podcast-mode.css',
})
export class LearnPodcastMode {
  topic = input<Topic>();
  subject = input<Subject>();
  lesson = input<Lesson>();
  isPlaying = input<boolean>();
  togglePlay = output<void>();
  playbackSpeed = input<number>();
  onCycleSpeed = output<void>();
  numSpeakers = input<1 | 2 | 3 | 4>(1);

  // State Signals
  currentSentenceIndex = signal(0);
  isVoiceReady = signal(false);

  // Icons
  readonly icons = { Headphones, Mic, User, Play, Pause, Rewind, FastForward, Volume2, Users };
  // DOM References
  @ViewChild('transcriptRef') transcriptRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('sentenceEl') sentenceRefs!: QueryList<ElementRef<HTMLDivElement>>;

  // Computed Values
  sentences = computed(() => {
    if (!this.topic()?.content) return [];
    return this.topic()
      ?.content.replace(/[#*]/g, '')
      .split(/(?<=[.?!])\s+/)
      .filter((s) => s.trim().length > 0);
  });

  progress = computed(() => {
    const total = this.sentences()?.length || 0;
    if (total === 0) return 0;
    return (this.currentSentenceIndex() / Math.max(1, total - 1)) * 100;
  });
  constructor() {
    this.initVoiceReady();

    // Effect for Speech Synthesis Loop (Replaces the main React useEffect)
    effect(() => {
      const synth = window.speechSynthesis;
      const playing = this.isPlaying();
      const index = this.currentSentenceIndex();
      const speed = this.playbackSpeed;
      const textArray = this.sentences();

      if (!synth || textArray?.length === 0) return;

      if (playing) {
        if (!synth.speaking) {
          this.speak(index);
        }
      } else {
        if (synth.speaking) synth.cancel();
      }
    });

    // Effect for Auto-scrolling
    effect(() => {
      const idx = this.currentSentenceIndex();
      setTimeout(() => {
        const activeEl = this.sentenceRefs?.toArray()[idx];
        if (activeEl && this.transcriptRef) {
          activeEl.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    });
  }

  private initVoiceReady() {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const updateVoices = () => {
      if (synth.getVoices().length > 0) this.isVoiceReady.set(true);
    };

    updateVoices();
    synth.addEventListener('voiceschanged', updateVoices);
  }

  private speak(idx: number) {
    const synth = window.speechSynthesis;
    const textArray = this.sentences();

    if (idx >= (textArray?.length || 0)) {
      this.togglePlay.emit();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textArray?.[idx]);
    utterance.rate = this.playbackSpeed() || 1;

    const voices = synth.getVoices();
    const enVoices = voices.filter((v) => v.lang.startsWith('en'));

    if (enVoices.length > 0) {
      const speakerVoices = [
        enVoices.find((v) => v.name.includes('Premium') || v.name.includes('Google US')) ||
          enVoices[0],
        enVoices.find(
          (v) => (v.name.includes('GB') || v.name.includes('UK')) && !v.name.includes('Premium'),
        ) || enVoices[1 % enVoices.length],
        enVoices.find((v) => v.name.includes('Natural') || v.name.includes('Australia')) ||
          enVoices[2 % enVoices.length],
        enVoices.find((v) => v.name.includes('Neural') || v.name.includes('Ireland')) ||
          enVoices[3 % enVoices.length],
      ];

      const speakerIdx = idx % this.numSpeakers();
      utterance.voice = speakerVoices[speakerIdx];
      utterance.pitch = [1.0, 1.1, 0.9, 1.05][speakerIdx];
    }

    utterance.onend = () => {
      if (idx < (textArray?.length || 0) - 1) {
        this.currentSentenceIndex.set(idx + 1);
      } else {
        this.togglePlay.emit();
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted') this.togglePlay.emit();
    };

    synth.speak(utterance);
  }

  handleSkip(direction: 'prev' | 'next') {
    window.speechSynthesis.cancel();
    if (direction === 'prev') {
      this.currentSentenceIndex.update((v) => Math.max(0, v - 1));
    } else {
      this.currentSentenceIndex.update((v) => Math.min((this.sentences()?.length || 0) - 1, v + 1));
    }
  }

  onSentenceClick(idx: number) {
    window.speechSynthesis.cancel();
    this.currentSentenceIndex.set(idx);
    if (!this.isPlaying) this.togglePlay.emit();
  }

  getSpeakerIcon(idx: number) {
    const icons = [Mic, User, Users, Headphones];
    return icons[idx % this.numSpeakers()];
  }

  stopOrPlay = () => {
    this.togglePlay.emit();
  };

  ngOnDestroy() {
    if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
  }
}
