import { Component, computed, inject, input } from '@angular/core';
import { getSubjectColorStyles } from '../../../../../shared/utils/subject-color.util';
import { Router } from '@angular/router';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-subject-card',
  imports: [LucideAngularModule],
  templateUrl: './subject-card.html',
  styleUrl: './subject-card.css',
})
export class SubjectCard {
  subject = input.required<any>();
  styles = computed(() => getSubjectColorStyles(this.subject()?.color));
  router = inject(Router);
  ChevronRight = ChevronRight;

  softShadow = 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]';
  hoverShadow =
    'hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300';

  goToSubject() {
    this.router.navigate(['subject', this.subject().id]);
  }
}
