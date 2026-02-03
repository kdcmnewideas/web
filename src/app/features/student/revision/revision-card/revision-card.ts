import { ScreenName } from './../../../../shared/constants/screen-names.constant';
import { Component, computed, inject, input } from '@angular/core';
import {
  CircleCheck,
  Clock,
  CircleAlert,
  Circle,
  LucideAngularModule,
  BookOpen,
  PenTool,
  RefreshCw,
  ChevronRight,
  EllipsisVertical,
} from 'lucide-angular';
import { SUBJECTS } from '../../../../shared/constants/mock-data.constant';
import { getSubjectColorStyles } from '../../../../shared/utils/subject-color.util';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revision-card',
  imports: [CardModule, LucideAngularModule],
  templateUrl: './revision-card.html',
  styleUrl: './revision-card.css',
})
export class RevisionCard {
  item = input.required<any>();
  router = inject(Router);

  styles = computed(() => getSubjectColorStyles(this.item().subjectId));
  status = computed(() => this.getStatusConfig(this.item().status));
  subject = computed(() => SUBJECTS.find((s) => s.id === this.item().subjectId));
  StatusIcon = this.status().icon;
  ScreenName = ScreenName;
  icons = {ChevronRight, EllipsisVertical, Clock}

  getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CircleCheck,
          color: 'text-emerald-500',
          bg: 'bg-emerald-50',
          label: 'Mastered',
        };
      case 'upcoming':
        return { icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-50', label: 'Pending' };
      case 'missed':
        return { icon: CircleAlert, color: 'text-rose-500', bg: 'bg-rose-50', label: 'Overdue' };
      default:
        return { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-50', label: status };
    }
  };

  getTypeIcon = (type: string) => {
    switch (type) {
      case 'test':
        return PenTool;
      case 'revision':
        return RefreshCw;
      default:
        return BookOpen;
    }
  };

  onNavigate = (path: string, id?: string | number) => {
    if (id) this.router.navigate([path, id]);
    else this.router.navigate([path]);
  };
}
