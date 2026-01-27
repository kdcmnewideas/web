import { Component, computed, input } from '@angular/core';
import { getSubjectColorStyles } from '../../../../../shared/utils/subject-color.util';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalculator,
  lucideAtom,
  lucideBookOpen,
  lucideHourglass,
  lucideDna,
  lucideChevronRight
} from '@ng-icons/lucide'

@Component({
  selector: 'app-subject-card',
  imports: [NgIcon],
  templateUrl: './subject-card.html',
  styleUrl: './subject-card.css',
  viewProviders: [provideIcons({ lucideCalculator, lucideAtom, lucideBookOpen, lucideHourglass, lucideDna, lucideChevronRight })],
})
export class SubjectCard {
  subject = input.required<any>();
  styles = computed(() => getSubjectColorStyles(this.subject()?.color));

  softShadow = 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]';
  hoverShadow =
    'hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300';
}
