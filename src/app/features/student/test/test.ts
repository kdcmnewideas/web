import {
  Component,
  signal,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft, ChevronRight, Layers } from 'lucide-angular';
import {
  Question,
  QuestionType,
  LESSON_CONTENTS,
} from '../../../shared/constants/mock-data.constant';
import { TestIntro } from './components/test-intro/test-intro';
import { TestFinished } from './components/test-finished/test-finished';
import { TestHeader } from './components/test-header/test-header';
import { TestCategory } from './components/test-intro/test-intro';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Mcq } from './components/mcq/mcq';
import { Written } from './components/written/written';
import { Oral } from './components/oral/oral';
import { FillBlanks } from './components/fill-blanks/fill-blanks';
import { Matching } from './components/matching/matching';

@Component({
  selector: 'app-test',
  imports: [
    CommonModule,
    LucideAngularModule,
    TestIntro,
    TestFinished,
    TestHeader,
    Mcq,
    Written,
    Oral,
    FillBlanks,
    Matching,
  ],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  lessonId = signal<string>('');
  QuestionType = QuestionType;

  // Icons
  readonly icons = { ArrowLeft, ChevronRight, Layers };

  // State Signals
  status = signal<'intro' | 'active' | 'finished'>('intro');
  selectedCategory = signal<TestCategory>('MIXED');
  activeQuestions = signal<Question[]>([]);
  currentQuestionIdx = signal(0);
  answers = signal<Record<string, any>>({});
  timeLeft = signal(600);

  // Recording State Signals
  isRecording = signal(false);
  recordingTime = signal(0);
  content: any;
  allQuestions: any;

  private mainTimer: any;
  private recordingTimer: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.lessonId.set(params['id']);
      this.content =
        this.lessonId() && LESSON_CONTENTS[this.lessonId()]
          ? LESSON_CONTENTS[this.lessonId()]
          : LESSON_CONTENTS['l1'];
      this.allQuestions = this.content?.quiz || [];
    });
    // Global Timer Effect
    effect(() => {
      console.log(this.timeLeft());
      if (this.status() === 'active' && this.timeLeft() > 0) {
        if (!this.mainTimer) {
          this.mainTimer = setInterval(() => {
            this.timeLeft.update((t) => t - 1);
          }, 1000);
        }
      } else {
        if (this.timeLeft() === 0 && this.status() === 'active') {
          this.status.set('finished');
        }
        this.clearMainTimer();
      }
    });

    // Recording Timer Effect
    effect(() => {
      if (this.isRecording()) {
        this.recordingTimer = setInterval(() => {
          this.recordingTime.update((t) => t + 1);
        }, 1000);
      } else {
        clearInterval(this.recordingTimer);
        this.recordingTime.set(0);
      }
    });
  }

  handleLaunch() {
    // Filter logic based on this.selectedCategory()
    // (Omitted for brevity, same logic as React)
    const filtered = this.mockAllQuestions();

    this.activeQuestions.set(filtered);
    this.timeLeft.set(filtered.length * 60);
    this.status.set('active');
    console.log(this.status());
  }

  updateAnswer(questionId: string, value: any) {
    this.answers.update((prev) => ({ ...prev, [questionId]: value }));
  }

  nextQuestion() {
    if (this.isRecording()) this.isRecording.set(false);
    if (this.currentQuestionIdx() < this.activeQuestions().length - 1) {
      this.currentQuestionIdx.update((i) => i + 1);
    } else {
      this.status.set('finished');
    }
  }

  prevQuestion() {
    if (this.isRecording()) this.isRecording.set(false);
    this.currentQuestionIdx.update((i) => Math.max(0, i - 1));
  }

  calculateScore(): number {
    // Use this.answers() and this.activeQuestions() to compute
    return 85; // Mocked result
  }

  private clearMainTimer() {
    if (this.mainTimer) clearInterval(this.mainTimer);
    this.mainTimer = null;
  }

  ngOnDestroy() {
    this.clearMainTimer();
    clearInterval(this.recordingTimer);
  }

  private mockAllQuestions(): Question[] {
    let filtered: Question[] = [];
    switch (this.selectedCategory()) {
      case 'MCQ':
        filtered = this.allQuestions.filter((q: any) => q.type === QuestionType.MCQ);
        break;
      case 'WRITTEN_ORAL':
        filtered = this.allQuestions.filter(
          (q: any) => q.type === QuestionType.WRITTEN || q.type === QuestionType.ORAL,
        );
        break;
      case 'INTERACTIVE':
        filtered = this.allQuestions.filter(
          (q: any) =>
            q.type === QuestionType.FILL_BLANKS ||
            q.type === QuestionType.TRUE_FALSE ||
            q.type === QuestionType.MATCHING,
        );
        break;
      default:
        filtered = this.allQuestions;
    }
    return filtered;
  }

  navigateTo(screen: string) {
    this.router.navigate([screen]);
  }
}
