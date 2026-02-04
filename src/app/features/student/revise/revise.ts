import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  ArrowLeft,
  RotateCw,
  Mic,
  Volume2,
  Sparkles,
  List,
  PenTool,
  Plus,
  Video,
  FileText,
  Trash2,
} from 'lucide-angular';
import {
  ALL_LESSONS,
  LESSON_CONTENTS,
  SUBJECTS,
} from '../../../shared/constants/mock-data.constant';
import { CardModule } from 'primeng/card';

// Types (Ideally imported from a shared types file)
type TabType = 'Flashcards' | 'Quick Prep' | 'Notes';
type AnswerLength = 'Short' | 'Medium' | 'Long';

interface NoteItem {
  id: string;
  type: 'text' | 'audio' | 'video';
  content: string;
  date: string;
}

@Component({
  selector: 'app-revise',
  imports: [CommonModule, LucideAngularModule, CardModule],
  templateUrl: './revise.html',
  styleUrl: './revise.css',
})
export class Revise {
  LessonId = signal('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.LessonId.set(params['id']);
    });
  }

  lesson = computed(() => ALL_LESSONS.find((s) => s.id === this.LessonId()));

  // Icons for the template
  readonly icons = {
    ArrowLeft,
    RotateCw,
    Mic,
    Volume2,
    Sparkles,
    List,
    PenTool,
    Plus,
    Video,
    FileText,
    Trash2,
  };

  // State using Signals
  activeTab = signal<TabType>('Flashcards');
  activeFlashcard = signal(0);
  activePrepIndex = signal(0);
  currentPrepTab = signal<AnswerLength>('Medium');
  isFlipped = signal(false);
  newNoteText = signal('');

  // Mock Data (Replace with service calls)
  notesList = signal<NoteItem[]>([
    {
      id: 'n1',
      type: 'text',
      content: 'Remember to review the basic operations section before the test.',
      date: '2 hours ago',
    },
    { id: 'n2', type: 'audio', content: 'Audio recording about variables', date: '1 day ago' },
  ]);

  // Mocking content - in real app, use a Service
  content = LESSON_CONTENTS['l1'];
  currentQA = computed(() => this.content.quickPrep[this.activePrepIndex()]);
  prepTabs = ['Short', 'Medium', 'Long'] as AnswerLength[];

  // Handlers
  handleNextCard() {
    this.isFlipped.set(false);
    setTimeout(() => {
      this.activeFlashcard.update((v) => (v + 1) % this.content.flashcards.length);
    }, 200);
  }

  handlePrevCard() {
    this.isFlipped.set(false);
    setTimeout(() => {
      this.activeFlashcard.update(
        (v) => (v - 1 + this.content.flashcards.length) % this.content.flashcards.length,
      );
    }, 200);
  }

  addTextNote(text: string) {
    if (!text.trim()) return;
    const newNote: NoteItem = {
      id: Date.now().toString(),
      type: 'text',
      content: text,
      date: 'Just now',
    };
    this.notesList.update((notes) => [newNote, ...notes]);
    this.newNoteText.set('');
  }

  handleDeleteNote(id: string) {
    this.notesList.update((notes) => notes.filter((n) => n.id !== id));
  }

  setTab(tab: string) {
    this.activeTab.set(tab as TabType);
  }

  onNavigate(path: string, id?: string) {
    this.router.navigate([path, id]);
  }
}
