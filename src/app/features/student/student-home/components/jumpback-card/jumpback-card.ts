import { Component, input, signal, computed, inject } from '@angular/core';
import { CircularProgress } from '../../../../../shared/components/circular-progress/circular-progress';
import { getSubjectColorStyles } from '../../../../../shared/utils/subject-color.util';
import { SUBJECTS } from '../../../../../shared/constants/mock-data.constant';
import { Router } from '@angular/router';
import { ArrowRight, LucideAngularModule, Play } from 'lucide-angular';

@Component({
  selector: 'app-jumpback-card',
  imports: [CircularProgress, LucideAngularModule],
  templateUrl: './jumpback-card.html',
  styleUrl: './jumpback-card.css',
})
export class JumpbackCard {
  router = inject(Router);
  lesson = input.required<any>();
  subject = computed(() => SUBJECTS.find((s) => s.id === this.lesson().subjectId));
  styles = computed(() => getSubjectColorStyles(this.subject()?.color || 'bg-slate-500'));
  percentage = signal<number>(65);
  icons = {
    Play,
    ArrowRight,
  };

  softShadow = 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]';
  hoverShadow =
    'hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300';

  navigateTo() {
    this.router.navigate(['learn', this.lesson()?.id]);
  }
}
