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
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revision-card',
  imports: [CardModule, LucideAngularModule, CommonModule],
  templateUrl: './revision-card.html',
  styleUrl: './revision-card.css',
})
export class RevisionCard {
  item = input.required<any>();
  router = inject(Router);

  styles = computed(() => this.getSubjectColorStyles(this.item().subjectId));
  status = computed(() => this.getStatusConfig(this.item().status));
  subject = computed(() => SUBJECTS.find((s) => s.id === this.item().subjectId));
  StatusIcon = computed(() => this.status().icon);
  ScreenName = ScreenName;
  icons = { ChevronRight, EllipsisVertical, Clock };

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

  getSubjectColorStyles = (subjectId: string) => {
    const subject = SUBJECTS.find((s) => s.id === subjectId);
    const colorClass = subject?.color || 'bg-slate-500';

    if (colorClass.includes('indigo'))
      return {
        text: 'text-indigo-600',
        bg: 'bg-indigo-50',
        icon: 'bg-indigo-600',
        border: 'border-indigo-100',
        glow: 'shadow-indigo-100',
      };
    if (colorClass.includes('teal'))
      return {
        text: 'text-teal-600',
        bg: 'bg-teal-50',
        icon: 'bg-teal-600',
        border: 'border-teal-100',
        glow: 'shadow-teal-100',
      };
    if (colorClass.includes('rose'))
      return {
        text: 'text-rose-600',
        bg: 'bg-rose-50',
        icon: 'bg-rose-600',
        border: 'border-rose-100',
        glow: 'shadow-rose-100',
      };
    if (colorClass.includes('amber'))
      return {
        text: 'text-amber-600',
        bg: 'bg-amber-50',
        icon: 'bg-amber-600',
        border: 'border-amber-100',
        glow: 'shadow-amber-100',
      };
    if (colorClass.includes('emerald'))
      return {
        text: 'text-emerald-600',
        bg: 'bg-emerald-50',
        icon: 'bg-emerald-600',
        border: 'border-emerald-100',
        glow: 'shadow-emerald-100',
      };
    return {
      text: 'text-slate-600',
      bg: 'bg-slate-50',
      icon: 'bg-slate-600',
      border: 'border-slate-100',
      glow: 'shadow-slate-100',
    };
  };
}
