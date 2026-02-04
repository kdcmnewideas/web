import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ALL_LESSONS,
  SUBJECTS,
  LESSON_CONTENTS,
  Topic
} from '../../../shared/constants/mock-data.constant';
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
import { AiWrapperService, IAiWrapper, IImageDTO } from '../../../services/ai-wrapper/ai-wrapper.service';


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
    ButtonModule
  ],
  templateUrl: './learn.html',
  styleUrl: './learn.css',
})
export class Learn {
  lessonId = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private aiWrapperService: AiWrapperService
  ) {
    // Access route parameters
    this.activatedRoute.params.subscribe((params) => {
      this.lessonId.set(params['id']);
    });

    effect(() => {
      this.getData(this.topics[this.activeTopicIndex()]);
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

  lesson = computed(() => ALL_LESSONS.find((l) => l.id === this.lessonId()));
  subject = computed(() => SUBJECTS.find((s) => s.id === this.lesson()?.subjectId));
  content =
    this.lessonId() && LESSON_CONTENTS[this.lessonId()]
      ? LESSON_CONTENTS[this.lessonId()]
      : LESSON_CONTENTS['l1'];

  topics = this.content?.topics || [];
  currentTopic = this.topics[this.activeTopicIndex()];
  quizQuestions = this.content?.quiz || [];
  activeQuestion = (this.quizQuestions[this.activeTopicIndex() % this.quizQuestions.length] ||
    this.quizQuestions[0]) as Question;

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
    if (this.activeTopicIndex() < this.topics.length - 1)
      this.activeTopicIndex.set(this.activeTopicIndex() + 1);
    else this.onNavigate('test', this.lessonId());
  }

  handleAnswer(idx: number) {
    this.selectedAnswers.set({ ...this.selectedAnswers(), [this.activeQuestion.id]: idx });
  }

    getData(topic: Topic){
    const data: IAiWrapper = {
      subject: this.subject()?.title || '',
      topic: topic?.title || '',
    }
    this.aiWrapperService.getData(data).subscribe((data) => {
      console.log(data);
    });
  }

  getMindMap(topic: Topic){
    const data: IAiWrapper = {
      subject: this.subject()?.title || '',
      topic: topic?.title || '',
    }
    this.aiWrapperService.getMindMap(data).subscribe((data) => {
      console.log(data);
    });
  }

  getImage(topic: Topic){
    const data: IImageDTO = {
      subject: this.subject()?.title || '',
      topic: topic?.title || '',
      image_type: 'diagram',
    }
    this.aiWrapperService.getImage(data).subscribe((data) => {
      console.log(data);
    });
  }
}
