import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: number;
  explanation: string;
}

@Component({
  selector: 'app-learn-quick-quiz',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './learn-quick-quiz.html',
  styleUrl: './learn-quick-quiz.css',
})
export class LearnQuickQuiz {

  // Signal-based inputs and outputs
  question = input.required<Question>();
  selectedAnswerIndex = input<number | undefined>();
  onAnswer = output<number>();

  // Derived state using computed signals
  hasAnswered = computed(() => this.selectedAnswerIndex() !== undefined);

  /**
   * Helper to handle dynamic classes for the option buttons.
   * Keeping logic here keeps the template clean.
   */
  getOptionStyles(idx: number) {
    const isSelected = this.selectedAnswerIndex() === idx;
    const isCorrect = this.question().correctAnswer === idx;
    const answered = this.hasAnswered();

    if (answered) {
      if (isCorrect) return 'bg-green-50 border-green-200';
      if (isSelected) return 'bg-red-50 border-red-200';
      return 'border-slate-200 opacity-60'; // Dim non-selected/incorrect options
    }

    if (isSelected) return 'border-indigo-600 bg-indigo-50/10';
    return 'border-slate-200 hover:bg-slate-50';
  }

  getCircleStyles(idx: number) {
    const isSelected = this.selectedAnswerIndex() === idx;
    const isCorrect = this.question().correctAnswer === idx;
    const answered = this.hasAnswered();

    if (answered) {
      if (isCorrect) return 'border-green-500 bg-green-500 text-white';
      if (isSelected) return 'border-red-500 bg-red-500 text-white';
    }

    if (isSelected) return 'border-indigo-600 text-indigo-600';
    return 'border-slate-300 text-transparent';
  }

}
