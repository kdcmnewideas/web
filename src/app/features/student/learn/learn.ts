import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ALL_LESSONS,
  SUBJECTS,
  LESSON_CONTENTS,
  Topic,
  MindMapNode,
} from '../../../shared/constants/mock-data.constant';
import { MIND_MAP_MOCK_DATA } from '../../../shared/mocks/learn-mind-map-mock.constant';
import {
  ArrowLeft,
  ChevronLeft,
  FileText,
  Headphones,
  LucideAngularModule,
  Mic,
  Network,
  Sparkles,
} from 'lucide-angular';
import { LearnTopicsList } from './learn-topics-list/learn-topics-list';
import { CardModule } from 'primeng/card';
import { LearnPodcastMode } from './learn-podcast-mode/learn-podcast-mode';
import { LearnMindMap } from './learn-mind-map/learn-mind-map';
import { LearnQuickQuiz, Question } from './learn-quick-quiz/learn-quick-quiz';
import { LearnNotes } from './learn-notes/learn-notes';
import { LearnReadMode } from './learn-read-mode/learn-read-mode';
import { ButtonModule } from 'primeng/button';
import {
  AiWrapperService,
  IAiWrapper,
  IImageDTO,
} from '../../../services/ai-wrapper/ai-wrapper.service';
import { IModuleRequest } from '../../../core/interface/ai-wrapper.interface';

@Component({
  selector: 'app-learn',
  imports: [
    FormsModule,
    LucideAngularModule,
    LearnTopicsList,
    CardModule,
    LearnPodcastMode,
    LearnMindMap,
    LearnQuickQuiz,
    LearnNotes,
    LearnReadMode,
    ButtonModule,
  ],
  templateUrl: './learn.html',
  styleUrl: './learn.css',
})
export class Learn {
  lessonId = signal('');

  // Cache of generated mind-maps keyed by topic id
  mindMaps = signal<Record<string, MindMapNode | undefined>>({});
  // Loading state for mind-map generation per topic
  mindMapLoading = signal<Record<string, boolean>>({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private aiWrapperService: AiWrapperService,
  ) {
    // Access route parameters
    this.activatedRoute.params.subscribe((params) => {
      this.lessonId.set(params['id']);
    });

    effect(() => {
      this.getData(this.topics()[this.activeTopicIndex()]);
      this.getImage(this.topics()[this.activeTopicIndex()]);
      this.getMindMap(this.topics()[this.activeTopicIndex()]);
    })
  }

  activeTopicIndex = signal(0);
  selectedAnswers = signal<Record<string, number>>({});
  notes = signal('');
  viewMode = signal<'read' | 'podcast' | 'mindmap'>('read');

  // Podcast Step State
  podcastStatus = signal<'config' | 'generating' | 'active'>('config');
  numSpeakers = signal<1 | 2 | 3 | 4>(1);
  isPlaying = signal(false);
  playbackSpeed = signal(1);
  data = signal<any>('');
  readDataLoad = signal(false);
  readImage = signal<any>(null);
  mindMap = signal<any>(null);

  lesson = computed(() => ALL_LESSONS.find((l) => l.id === this.lessonId()));
  subject = computed(() => SUBJECTS.find((s) => s.id === this.lesson()?.subjectId));
  content = computed(() => {
    const id = this.lessonId();
    if (id && LESSON_CONTENTS[id]) {
      return LESSON_CONTENTS[id];
    }
    // Fallback to first available lesson content for consistency
    const firstLessonId = Object.keys(LESSON_CONTENTS)[0];
    return (
      LESSON_CONTENTS[firstLessonId] || {
        lessonId: '',
        topics: [],
        quiz: [],
        flashcards: [],
        quickPrep: [],
      }
    );
  });

  topics = computed(() => this.content().topics || []);
  currentTopic = computed(() => this.topics()[this.activeTopicIndex()] || this.topics()[0]);
  quizQuestions = computed(() => this.content().quiz || []);
  activeQuestion = computed(() => {
    const qs = this.quizQuestions();
    if (!qs || qs.length === 0) return {} as Question;
    const idx = this.activeTopicIndex() % qs.length;
    return (qs[idx] || qs[0]) as Question;
  });

  // Computed mind map to display for current topic (topic-specific fallback)
  displayedMindMap = computed(() => {
    const t = this.currentTopic();
    if (!t) return undefined as unknown as MindMapNode;
    const cached = this.mindMaps()[t.id];
    if (cached) return cached;
    if (t.mindMap && t.mindMap.id && t.mindMap.id !== 'root') return t.mindMap;
    return {
      id: t.id,
      label: t.title,
      children: [{ id: `${t.id}-c1`, label: t.content || t.title }],
    } as MindMapNode;
  });

  icons = {
    ArrowLeft,
    FileText,
    Headphones,
    Network,
    Mic,
    ChevronLeft,
    Sparkles,
  };

  handleStartPodcast = () => {
    this.podcastStatus.set('generating');
    setTimeout(() => {
      this.podcastStatus.set('active');
      this.isPlaying.set(true);
    }, 2000); // Simulate AI generation
  };

  handleNumSpeakersChange = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const num = parseInt(value) || 1;
    if (num >= 1 && num <= 4) {
      this.numSpeakers.set(num as 1 | 2 | 3 | 4);
    }
  };

  /**
   * Navigate to the given screen name and optional id.
   * If an id is provided, it will be appended to the screen name
   * in the URL path.
   * @param {string} screenName - The name of the screen to navigate to.
   * @param {string} [id] - Optional id to append to the URL path.
   */
  onNavigate(screenName: string, id?: string) {
    if (id) this.router.navigate([screenName, id]);
    else this.router.navigate([screenName]);
  }

  next() {
    if (this.activeTopicIndex() < this.topics().length - 1)
      this.activeTopicIndex.set(this.activeTopicIndex() + 1);
    else this.onNavigate('test', this.lessonId());
  }

  handleAnswer(idx: number) {
    this.selectedAnswers.set({ ...this.selectedAnswers(), [this.activeQuestion().id]: idx });
  }

  getData(topic: Topic) {
    this.readDataLoad.set(true);
    const data: IAiWrapper = {
      subject: this.subject()?.title || '',
      topic: topic?.title || '',
    };
    this.aiWrapperService.getData(data).subscribe((data) => {
      this.data.set(data);
      this.readDataLoad.set(false);
    });
  }

  getMindMap(topic: Topic) {
    const data: IAiWrapper = {
      subject: this.subject()?.title || '',
      topic: topic?.title || '',
    };
    this.aiWrapperService.getMindMap(data).subscribe((data) => {
      this.mindMap.set(data);
    });
  }

  getImage(topic: Topic) {
    const data: IImageDTO = {
      subject: this.subject()?.title || '',
      topic: topic?.title || '',
      image_type: 'diagram',
    };
    this.aiWrapperService.getImage(data).subscribe((data) => {
      this.readImage.set(data);
    });
  }

  generateMindMap(topic: Topic) {
    const req: IModuleRequest = {
      subject: this.subject()?.title || '',
      topic: topic?.title || '',
    };

    // mark loading for this topic
    this.mindMapLoading.set({ ...this.mindMapLoading(), [topic.id]: true });

    this.aiWrapperService.getMindMap(req).subscribe({
      next: (res: any) => {
        // stop loading
        this.mindMapLoading.set({ ...this.mindMapLoading(), [topic.id]: false });
        // use API result if valid, otherwise create a small topic-specific node
        const mm = res as MindMapNode | undefined;
        const node: MindMapNode =
          mm && mm.id
            ? mm
            : {
                id: topic.id,
                label: topic.title,
                children: [{ id: `${topic.id}-c1`, label: topic.content || topic.title }],
              };
        this.mindMaps.set({ ...this.mindMaps(), [topic.id]: node });
      },
      error: (err: any) => {
        console.error('getMindMap API error', err);
        // stop loading
        this.mindMapLoading.set({ ...this.mindMapLoading(), [topic.id]: false });
        // fallback only on error: prefer topic-specific mindMap if present and not the global root mock
        const fallback =
          topic.mindMap && topic.mindMap.id && topic.mindMap.id !== 'root'
            ? topic.mindMap
            : {
                id: topic.id,
                label: topic.title,
                children: [{ id: `${topic.id}-c1`, label: topic.content || topic.title }],
              };
        this.mindMaps.set({ ...this.mindMaps(), [topic.id]: fallback });
      },
    });
  }
}
