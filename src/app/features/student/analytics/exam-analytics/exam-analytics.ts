import { Component, computed, input } from '@angular/core';
import { BookOpen, LucideAngularModule } from 'lucide-angular';
import { SUBJECTS } from '../../../../shared/constants/mock-data.constant';

@Component({
  selector: 'app-exam-analytics',
  imports: [LucideAngularModule],
  templateUrl: './exam-analytics.html',
  styleUrl: './exam-analytics.css',
})
export class ExamAnalytics {
  icons = { BookOpen };

  exam = input.required<any>();
  subject = computed(() => SUBJECTS.find((s) => s.id === this.exam().subjectId));
}
