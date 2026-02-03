import { Component, computed, inject, signal } from '@angular/core';
import {
  CircleCheck,
  LucideAngularModule,
  EllipsisVertical,
  ChevronRight,
  Plus,
  CalendarDays,
  Target,
  Sparkles,
  History,
  ArrowLeft,
} from 'lucide-angular';
import {
  SCHEDULE_ITEMS,
  ScheduleItem,
  SUBJECTS,
} from '../../../shared/constants/mock-data.constant';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { RevisionCard } from './revision-card/revision-card';

@Component({
  selector: 'app-revision',
  imports: [LucideAngularModule, CardModule, RevisionCard],
  templateUrl: './revision.html',
  styleUrl: './revision.css',
})
export class Revision {
  activeTab = signal<'upcoming' | 'history'>('upcoming');
  mockToday = '2023-11-01'; // Mocking today's date
  router = inject(Router);
  icons = {
    EllipsisVertical,
    ChevronRight,
    Plus,
    CalendarDays,
    Target,
    Sparkles,
    History,
    ArrowLeft,
    CircleCheck,
  };

  filteredItems = computed(() => {
    return SCHEDULE_ITEMS.filter((item) => {
      if (this.activeTab() === 'upcoming') {
        return item.status === 'upcoming';
      } else {
        return item.status === 'completed' || item.status === 'missed';
      }
    }).sort((a, b) => {
      return this.activeTab() === 'upcoming'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  // Group by date for a timeline feel
  groupedItems = computed(() => {
    const groups: Record<string, ScheduleItem[]> = {};
    this.filteredItems().forEach((item) => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }
      groups[item.date].push(item);
    });
    return groups;
  });

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

  formatDateHeader = (dateStr: string) => {
    if (dateStr === this.mockToday) return 'Today';
    const tomorrow = new Date(this.mockToday);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateStr === tomorrow.toISOString().split('T')[0]) return 'Tomorrow';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  onNavigate = (path: string, id?: string | number) => {
    if (id) this.router.navigate([path, id]);
    else this.router.navigate([path]);
  };

  getKeys(obj: any) {
    return Object.keys(obj);
  }
}
