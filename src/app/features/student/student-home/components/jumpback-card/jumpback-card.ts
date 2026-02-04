import { Component, input, signal, computed } from '@angular/core';
import { CircularProgress } from '../../../../../shared/components/circular-progress/circular-progress';
import { getSubjectColorStyles } from '../../../../../shared/utils/subject-color.util';
import { SUBJECTS } from '../../../../../shared/constants/mock-data.constant';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapArrowRight, bootstrapPlayFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-jumpback-card',
  imports: [CircularProgress, NgIcon],
  templateUrl: './jumpback-card.html',
  styleUrl: './jumpback-card.css',
  viewProviders: [provideIcons({bootstrapPlayFill, bootstrapArrowRight})]
})
export class JumpbackCard {
  lesson = input.required<any>();
  subject = computed(() => SUBJECTS.find((s) => s.id === this.lesson().subjectId));
  styles = computed(() => getSubjectColorStyles(this.subject()?.color || 'bg-slate-500'));
  percentage = signal<number>(65);

  softShadow = 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]';
  hoverShadow =
    'hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300';
}
